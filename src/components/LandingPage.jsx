import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PaintWindow from './PaintWindow';
import SongWindow from './SongWindow';
import NotepadWindow from './NotepadWindow';
import DraggableWindow from './DraggableWindow';
import CloudTransition from './CloudTransition';
import mePhoto from '../assets/newsoup.jpg';
import albumPhoto from '../assets/purple-rain-album.jpg';


const Page = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
  padding: 12px 40px 30px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    #006363 0%,
    #017474 50%,
     #049393 80%,
    rgba(255, 255, 255, 0) 100%
  );

  @media (max-width: 600px) {
    padding-top: 16px;
  }
`;

const Intro = styled.div`
  max-width: 520px;
  margin-top: 18px;
  font-family: 'Sintony', sans-serif;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

// White text with a hard shadow — the same trick classic desktop icon
// labels used to stay legible over any wallpaper, rather than boxing the
// text in a translucent card.
const desktopLabel = `
  color: #ffffff;
  text-shadow: 1px 1px 0 #000, 2px 2px 3px rgba(0, 0, 0, 0.35);
`;

const Heading = styled.h1`
  font-family: 'Kelly Slab', serif;
  font-weight: 400;
  font-size: 42px;
  margin: 0 0 24px;
  ${desktopLabel}
`;

const Cursor = styled.span`
  display: inline-block;
  margin-left: 4px;
  animation: blink 1s steps(1) infinite;

  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

const NameTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #fff;
  padding-bottom: 8px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 700;
  ${desktopLabel}

  @media (max-width: 600px) {
    & > img {
      display: none;
    }
  }
`;

const Body = styled.p`
  font-size: 15px;
  line-height: 1.7;
  ${desktopLabel}
`;

// stacked, overlapping, draggable windows
const Stack = styled.div`
  position: relative;
  width: 480px;
  height: 580px;
  margin-left: auto;
  z-index: 2;
`;

// purely decorative desktop icons scattered on the green, reinforcing
// that this is a desktop and not a generic hero banner
const DesktopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 72px;
`;

// Same look as DesktopIcon, but actually interactive — a light "selection"
// tint on hover, same idea as clicking an icon in classic Windows Explorer.
const ClickableDesktopIcon = styled(DesktopIcon)`
  pointer-events: auto;
  position: relative;
  z-index: 2;
  cursor: pointer;
  padding: 4px;
  border-radius: 2px;

  &:hover,
  &:focus-visible {
    background: rgba(0, 0, 128, 0.25);
    outline: 1px dotted rgba(255, 255, 255, 0.8);
  }
`;

const DesktopRow = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 16px;
  width: 180px;
  z-index: 2;
  pointer-events: none;

  @media (max-width: 600px) {
    display: none;
  }
`;

const DesktopIconLabel = styled.span`
  font-size: 12px;
  text-align: center;
  ${desktopLabel}
`;

const WINDOWS = [
  {
    id: 'paint',
    initialX: -150,
    initialY: 10,
    render: () => <PaintWindow photoSrc={mePhoto} />,
  },
  {
    id: 'song',
    initialX: 180,
    initialY: 280,
    render: () => <SongWindow coverSrc={albumPhoto} />,
  },
];

const headings = [
  'Nice to meet you.',
  'Welcome back!',
  'Good to see you again.',
  'Oh, hello again.',
  'Glad you came by.',
  'You’re welcome here.',
  'Nice seeing you around.',
  'Come on in.',
  'Hello there.',
  'Hey, you made it.',
  'Good to have you here.',
  'Glad you’re here.',
  'Good to see you.',
  'Thanks for stopping by.',
  'It’s nice to see you.',
  'Nice of you to drop by.',
  'Hello, hello.',
];

const LandingPage = () => {
  const [stackOrder, setStackOrder] = useState(WINDOWS.map((w) => w.id));
  const [heading, setHeading] = useState('Nice to meet you.');
  const [notepadOpen, setNotepadOpen] = useState(false);
  const headingInitialized = useRef(false);
  const notepadIconRef = useRef(null);

  useEffect(() => {
    if (headingInitialized.current) return;
    headingInitialized.current = true;

    const previousHeading = localStorage.getItem('lastHeading');
    const availableHeadings = headings.filter((item) => item !== previousHeading);
    const randomHeading =
      availableHeadings[Math.floor(Math.random() * availableHeadings.length)];

    localStorage.setItem('lastHeading', randomHeading);
    setHeading(randomHeading);
  }, []);

  const bringToFront = (id) => {
    setStackOrder((current) => {
      if (current[current.length - 1] === id) return current;
      return [...current.filter((item) => item !== id), id];
    });
  };

  const getZIndex = (id) => stackOrder.indexOf(id) + 1;

  // Clicking the Notepad icon opens the easter-egg window and brings it to
  // front — clicking it again while already open just re-focuses it rather
  // than opening a second copy.
  const openNotepad = () => {
    setNotepadOpen(true);
    bringToFront('notepad');
  };

  const closeNotepad = () => {
    setNotepadOpen(false);
    setStackOrder((current) => current.filter((id) => id !== 'notepad'));
  };

  const handlePagePointerDownCapture = (event) => {
    const icon = notepadIconRef.current;
    if (!icon) return;

    const bounds = icon.getBoundingClientRect();
    const isInsideIcon =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (isInsideIcon) {
      event.stopPropagation();
      openNotepad();
    }
  };

  const windows = [
    ...WINDOWS,
    notepadOpen && {
      id: 'notepad',
      initialX: 60,
      initialY: 60,
      render: () => <NotepadWindow onClose={closeNotepad} />,
    },
  ].filter(Boolean);

  return (
    <Page id="about" onPointerDownCapture={handlePagePointerDownCapture}>
      <DesktopRow>
        <DesktopIcon>
          <img
            src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
            alt=""
            width={32}
            height={32}
          />
          <DesktopIconLabel>My Computer</DesktopIconLabel>
        </DesktopIcon>

        <DesktopIcon>
          <img
            src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
            alt=""
            width={32}
            height={32}
          />
          <DesktopIconLabel>Recycle Bin</DesktopIconLabel>
        </DesktopIcon>

        <DesktopIcon>
          <img
            src="https://win98icons.alexmeub.com/icons/png/msie1-5.png"
            alt=""
            width={32}
            height={32}
          />
          <DesktopIconLabel>Windows Explorer</DesktopIconLabel>
        </DesktopIcon>

        <ClickableDesktopIcon
          ref={notepadIconRef}
          role="button"
          tabIndex={0}
          onClick={openNotepad}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openNotepad();
          }}
        >
          <img
            src="https://win98icons.alexmeub.com/icons/png/notepad-4.png"
            alt=""
            width={32}
            height={32}
          />
          <DesktopIconLabel>README.txt</DesktopIconLabel>
        </ClickableDesktopIcon>
      </DesktopRow>

      <Intro>
        <Heading>
          {heading}
          <Cursor>|</Cursor>
        </Heading>
        <NameTag>
          <img
            src="https://win98icons.alexmeub.com/icons/png/computer-5.png"
            alt=""
            width={24}
            height={24}
          />
          Something about me
        </NameTag>
        <Body>
          Hi, I’m Shaivi. I’m a software engineer and currently studying for my MSc in Computer Science.
          <br /><br />
          I’m naturally curious, and I tend to get interested in a lot of different things. Right now, that means I’m exploring AI and machine learning for my master's, and also recently gotten into game development and design.
          <br />
          Outside of tech, I’m usually reading, painting, listening to music, or sitting at a piano and playing my favourite songs. I like having creative things to do, which is why I built this page!
          <br /><br />
          Check around to discover my work and a little more about me!
        </Body>
      </Intro>

      <Stack>
        {windows.map(({ id, initialX, initialY, render }) => (
          <DraggableWindow
            key={id}
            id={id}
            initialX={initialX}
            initialY={initialY}
            zIndex={getZIndex(id)}
            onFocus={bringToFront}
          >
            {render()}
          </DraggableWindow>
        ))}
      </Stack>

      <CloudTransition />
    </Page>
  );
};

export default LandingPage;