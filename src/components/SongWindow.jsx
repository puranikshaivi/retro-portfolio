import { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled, { keyframes } from 'styled-components';
import defaultCover from '../assets/purple-rain-album.jpg';
import jeffBuckleyCover from '../assets/jeffBuckley.jpg';
import pinkFloydCover from '../assets/pinkFloyd.jpg';
/* Animations */

const discSpin = keyframes`
  to { transform: rotate(360deg); }
`;

const coverScan = keyframes`
  from {
    clip-path: inset(0 0 100% 0);
    filter: grayscale(1) contrast(1.6);
  }
  to {
    clip-path: inset(0 0 0 0);
    filter: none;
  }
`;

/* Artist / track text types itself in */
const typeIn = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`;
/* Window */

const StyledWindow = styled(Window)`
  width: 320px;
  font-family: 'ms_sans_serif';

  @media (max-width: 600px) {
    width: min(290px, calc(100vw - 48px));
    max-width: 100%;
    margin-left: 56px;
  }
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DiscIcon = styled.svg`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  animation: ${discSpin} 1.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
/* Cover and info */

const Body = styled.div`
  display: flex;
  gap: 8px;
`;

/* Win95 dither pattern shows behind the cover while a new one scans in */
const CoverWrap = styled.div`
  flex-shrink: 0;
  background-color: #fff;
  background-image: repeating-conic-gradient(#c0c0c0 0% 25%, #fff 0% 50%);
  background-size: 2px 2px;
  line-height: 0;
`;

const Cover = styled.img`
  width: 90px;
  height: 100px;
  object-fit: cover;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};
  animation: ${coverScan} 0.7s steps(8) both;

  @media (max-width: 600px) {
    width: 72px;
    height: 80px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: 11px;
`;

const Label = styled.span`
  font-weight: bold;
  width: 34px;
  flex-shrink: 0;
`;

const Field = styled.div`
  flex: 1;
  min-width: 0;
  background: ${({ theme }) => theme.canvas || '#fff'};
  border: 1px solid ${({ theme }) => theme.borderDark};
  padding: 2px 4px;
  overflow: hidden;
`;

const FieldText = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  animation: ${typeIn} 0.6s steps(14) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: auto;
  padding-top: 8px;
`;

const CtrlButton = styled(Button)`
  box-sizing: border-box;
  width: 26px;
  min-width: 26px;
  height: 22px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
`;

const ControlIcon = styled.svg`
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: currentColor;
`;
/* Component */

const SongWindow = ({
  coverSrc = defaultCover,
  artist = 'Prince and the Revolution',
  track = 'Purple Rain',
}) => {
  const songs = [
    { coverSrc, artist, track },
    {
      coverSrc: jeffBuckleyCover,
      artist: 'Jeff Buckley',
      track: "Lover, You Should've Come Over"
    },
    {
      coverSrc: pinkFloydCover,
      artist: 'Pink Floyd',
      track: 'The Great Gig in the Sky'
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  const changeTrack = (direction) => {
    setCurrentSongIndex(
      (index) => (index + direction + songs.length) % songs.length,
    );
  };

  return (
    <StyledWindow>
      <Header className="drag-handle">
        <HeaderTitle>
          <DiscIcon
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" fill="#c0c0c0" stroke="#404040" />
            <path
              d="M8 1.5A6.5 6.5 0 0 1 14.5 8"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <circle cx="8" cy="8" r="2" fill="#fff" stroke="#808080" />
          </DiscIcon>
          CD Player
        </HeaderTitle>
        <Button size="sm" square>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>
      <WindowContent>
        <Stack>
          <Body>
            <CoverWrap>
              {/* key restarts the scan-in animation on every track change */}
              <Cover
                key={currentSongIndex}
                src={currentSong.coverSrc}
                alt={`${currentSong.artist} — ${currentSong.track}`}
              />
            </CoverWrap>

            <InfoCol>
              <Row>
                <Label>Artist:</Label>
                <Field>
                  <FieldText key={`a-${currentSongIndex}`}>
                    {currentSong.artist}
                  </FieldText>
                </Field>
              </Row>
              <Row>
                <Label>Track:</Label>
                <Field>
                  <FieldText key={`t-${currentSongIndex}`}>
                    {currentSong.track}
                  </FieldText>
                </Field>
              </Row>

              <Controls>
                <CtrlButton
                  type="button"
                  aria-label="Previous track"
                  onClick={() => changeTrack(-1)}
                >
                  <ControlIcon viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2 3h2v10H2zM10 3 5 8l5 5zM15 3 10 8l5 5z" />
                  </ControlIcon>
                </CtrlButton>
                <CtrlButton
                  type="button"
                  aria-label="Play"
                >
                  <ControlIcon viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 2.5 14 8 4 13.5z" />
                  </ControlIcon>
                </CtrlButton>
                <CtrlButton
                  type="button"
                  aria-label="Pause"
                >
                  <ControlIcon viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 2.5h4v11H3zM9 2.5h4v11H9z" />
                  </ControlIcon>
                </CtrlButton>
                <CtrlButton
                  type="button"
                  aria-label="Stop"
                >
                  <ControlIcon viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 3h10v10H3z" />
                  </ControlIcon>
                </CtrlButton>
                <CtrlButton
                  type="button"
                  aria-label="Next track"
                  onClick={() => changeTrack(1)}
                >
                  <ControlIcon viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M1 3l5 5-5 5zM6 3l5 5-5 5zM12 3h2v10h-2z" />
                  </ControlIcon>
                </CtrlButton>
              </Controls>
            </InfoCol>
          </Body>

        </Stack>
      </WindowContent>
    </StyledWindow>
  );
};

export default SongWindow;