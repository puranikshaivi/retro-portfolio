import { useCallback, useEffect, useState } from 'react';
import { Button, Window, WindowContent, WindowHeader } from 'react95';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const prompts = [

  {
    text: 'Leaving so soon? Are you sure?',
    stay: "Ok fine, I'll stay",
    leave: 'Bye',
    celebration: 'Excellent choice!',
  },
  {
    text: "I'm not mad. I'm just disappointed.",
    stay: "I'm sorry, I'll stay",
    leave: 'Bye anyway',
    celebration: 'Apology accepted.',
  },
  {
    text: 'But we were just getting to know each other...',
    stay: 'Awww, ok',
    leave: 'It was a short fling',
    celebration: 'Friendship.exe resumed running.',
  },
  {
    text: 'Before you go, did you at least say hi to the Recycle Bin?',
    stay: 'Going to say hi',
    leave: 'The bin and I are not close',
    celebration: 'The Recycle Bin says hi.',
  },
  {
    text: 'You are about to leave 1995. Are you ready for the future?',
    stay: 'I am not ready',
    leave: 'Take me to 2026',
    celebration: 'The future can wait. Welcome back!',
  },
  {
    text: 'This will close all programs, including Paint and a very good CD.',
    stay: 'Not Purple Rain!',
    leave: 'I don\'t care',
    celebration: 'The CD is spinning again!',
  },
  {
    text: 'Did you save your work? Your 14 unsaved Solitaire games will be lost.',
    stay: 'Go back to Solitaire',
    leave: 'Let them burn',
    celebration: 'Saved! All 14 games are safe.',
  },
  {
    text: 'A fatal exception has occurred: you are too awesome for this computer.',
    stay: 'Flattered, staying',
    leave: 'Ignore and shut down',
    celebration: 'Exception handled. Compliment accepted.',
  },
  {
    text: 'Are you sure? Shaivi will take this personally.',
    stay: 'Save Shaivi',
    leave: 'Shaivi is on her own',
    celebration: 'Shaivi is thrilled that you stayed!',
  },

  {
    text: 'A cat just sat on the keyboard and cancelled your shutdown.',
    stay: 'Cat wins',
    leave: 'Move the cat',
    celebration: 'The cat has won this round. Purrfect!',
  },
  {
    text: 'Every time you leave, a cat knocks something off a table.',
    stay: 'Protect the table',
    leave: 'Not my table',
    celebration: 'Table saved. The cat is plotting something else.',
  },
  {
    text: 'It is now safe to turn off your computer. The computer, however, is not okay with it.',
    stay: 'Comfort the computer',
    leave: 'Computer will cope',
    celebration: 'The computer feels much better now.',
  },
  // {
  //   text: 'It is now safe to turn off your computer. A cat has been informed and will be disappointed.',
  //   stay: 'Spare the cat',
  //   leave: 'The cat will live',
  //   celebration: 'The cat has been told. It is purring.',
  // },
  {
    text: 'It is now safe to turn off your computer. Please however think about whether you really want to do this.',
    stay: 'I will think about it',
    leave: 'I am sure',
    celebration: 'Windows says: yay!',
  },
  {
    text: 'It is NOT safe to turn off your computer. Things are happening in there.',
    stay: 'What\'s happening?',
    leave: 'I fear nothing',
    celebration: 'The things are still happening. Carry on.',
  },
  // {
  //   text: 'WARNING: It is NOT safe to turn off your computer. Our lawyers (a cat) advise against it.',
  //   stay: 'Listen to the cat',
  //   leave: 'Cat has no authority',
  //   celebration: 'The legal team (cat) is pleased.',
  // },
  {
    text: 'It is NOT safe to turn off your computer. Defragmenting at 3%. Do not touch.',
    stay: 'Hands off',
    leave: 'Touching it',
    celebration: 'Hands off, as requested. Defrag proceeding.',
  },
  {
    text: 'It is NOT safe to turn off your computer. The modem is mid-handshake.',
    stay: 'Beep boop, waiting',
    leave: 'Hang up on it',
    celebration: 'Handshake complete. Very firm.',
  },
  {
    text: 'It is NOT safe to turn off your computer. Shaivi will find out and she will be sad.',
    stay: 'Protect her feelings',
    leave: 'She will recover',
    celebration: 'Shaivi is happy. Thanks for staying!',
  },
];

const LAST_PROMPT_KEY = 'shutdownPromptIndex';
const CONFETTI_COLORS = ['#ff3b30', '#ffd700', '#00a2ff', '#00d26a', '#ff4fa3', '#fff'];
const confetti = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  dx: `${Math.round(Math.cos((index / 48) * Math.PI * 2) * (34 + (index % 4) * 13))}vw`,
  dy: `${Math.round(Math.sin((index / 48) * Math.PI * 2) * (30 + (index % 5) * 12))}vh`,
  delay: `${(index % 8) * 55}ms`,
  color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
  size: 10 + (index % 5) * 5,
  star: index % 3 !== 0,
}));

const ScreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20000;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  padding: 16px;
  font-family: 'ms_sans_serif', sans-serif;
`;

const DialogBackdrop = styled(ScreenOverlay)`
  background: rgba(0, 0, 0, 0.72);
  overscroll-behavior: contain;
`;

const DialogWindow = styled(Window)`
  width: min(440px, calc(100vw - 32px));
  max-width: 100%;
  font-family: 'ms_sans_serif', sans-serif;
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled(Button)`
  min-width: 24px;
  width: 24px;
  height: 22px;
  padding: 0;
  line-height: 1;
`;

const Prompt = styled.p`
  margin: 4px 0 20px;
  font-size: 15px;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    min-height: 38px;
    min-width: 120px;
    white-space: normal;
  }

  @media (max-width: 420px) {
    flex-direction: column;

    button {
      width: 100%;
      min-height: 42px;
    }
  }
`;

const burst = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(-35deg);
  }
  12% {
    opacity: 1;
  }
  78% {
    opacity: 1;
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.15) rotate(150deg);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.65) rotate(210deg);
  }
`;

const CelebrationLayer = styled(ScreenOverlay).attrs({
  role: 'status',
  'aria-live': 'polite',
})`
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.32), transparent 58%);
    animation: celebration-flash 2.4s ease-out both;
  }

  @keyframes celebration-flash {
    0% { opacity: 0; transform: scale(0.25); }
    18% { opacity: 1; }
    100% { opacity: 0; transform: scale(1.5); }
  }
`;

const ConfettiPiece = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  clip-path: ${({ $star }) =>
    $star
      ? 'polygon(50% 0%, 62% 35%, 98% 35%, 69% 57%, 80% 93%, 50% 71%, 20% 93%, 31% 57%, 2% 35%, 38% 35%)'
      : 'none'};
  filter: drop-shadow(2px 2px 0 #000);
  animation: ${burst} 2.2s steps(8, end) ${({ $delay }) => $delay} both;
`;

const CelebrationMessage = styled.div`
  z-index: 1;
  max-width: calc(100vw - 56px);
  padding: 10px 16px;
  color: #fff;
  background: #000080;
  border: 4px solid;
  border-color: #fff #404040 #404040 #fff;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.55);
  font-family: 'ms_sans_serif', sans-serif;
  font-size: clamp(16px, 4vw, 24px);
  font-weight: bold;
  text-shadow: 2px 2px #000;
  text-align: center;
  animation: celebration-message 2.4s steps(5, end) both;

  @keyframes celebration-message {
    0%, 12% { opacity: 0; transform: scale(0.5); }
    22%, 78% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.15); }
  }
`;

const BlackScreen = styled(ScreenOverlay)`
  background: #000;
  color: #ff8c00;
  align-content: center;
  justify-items: start;
  padding: max(24px, 8vw);
  font-family: 'Courier New', monospace;
  font-size: clamp(16px, 3vw, 22px);
  line-height: 1.7;
  cursor: pointer;
  user-select: none;
`;

const BootScreen = styled(BlackScreen)`
  cursor: default;
  justify-items: center;
  align-content: center;
  gap: 22px;
`;

const BootMessage = styled.div`
  text-align: center;
`;

const ProgressTrack = styled.div`
  width: min(320px, 75vw);
  height: 18px;
  padding: 3px;
  border: 1px solid #ff8c00;
`;

const progress = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #ff8c00;
  animation: ${progress} 950ms steps(12, end) both;
`;

const selectPrompt = () => {
  const storedIndex = sessionStorage.getItem(LAST_PROMPT_KEY);
  const previousIndex = storedIndex === null ? -1 : Number(storedIndex);
  const availableIndexes = prompts
    .map((_, index) => index)
    .filter((index) => index !== previousIndex);
  const shuffledIndexes = [...availableIndexes];

  for (let index = shuffledIndexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledIndexes[index], shuffledIndexes[swapIndex]] = [
      shuffledIndexes[swapIndex],
      shuffledIndexes[index],
    ];
  }

  const selectedIndex = shuffledIndexes[0];
  return { prompt: prompts[selectedIndex], index: selectedIndex };
};

const ShutdownExperience = ({ onClose }) => {
  const [selection] = useState(selectPrompt);
  const [phase, setPhase] = useState('dialog');
  const [countdown, setCountdown] = useState(8);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const prompt = selection.prompt;

  const startBoot = useCallback(() => {
    setPhase('boot');
  }, []);

  const handleStay = () => {
    setCelebrationMessage(prompt.celebration);
    setPhase('celebration');
  };

  const handleLeave = () => {
    window.scrollTo(0, 0);
    setPhase('leaving');
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const buttons = event.currentTarget.querySelectorAll('button:not(:disabled)');
    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault();
      lastButton.focus();
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault();
      firstButton.focus();
    }
  };

  useEffect(() => {
    sessionStorage.setItem(LAST_PROMPT_KEY, String(selection.index));
  }, [selection.index]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => () => document.body.classList.remove('shutdown-crt'), []);

  useEffect(() => {
    if (phase !== 'celebration') return undefined;
    const timeout = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timeout);
  }, [phase, onClose]);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;

    const timeout = window.setTimeout(() => {
      document.body.classList.add('shutdown-crt');
      setPhase('crt');
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'crt') return undefined;

    const timeout = window.setTimeout(() => setPhase('black'), 1200);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'black') return undefined;

    const timeout = window.setTimeout(() => {
      if (countdown <= 1) {
        setCountdown(0);
        startBoot();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    const skipCountdown = () => startBoot();
    window.addEventListener('keydown', skipCountdown);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', skipCountdown);
    };
  }, [countdown, phase, startBoot]);

  useEffect(() => {
    if (phase !== 'boot') return undefined;
    const timeout = window.setTimeout(() => window.location.reload(), 1000);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  if (phase === 'dialog') {
    return createPortal(
      <DialogBackdrop>
        <DialogWindow
          role="dialog"
          aria-modal="true"
          aria-labelledby="shutdown-title"
          onKeyDown={handleDialogKeyDown}
        >
          <Header className="drag-handle">
            <span id="shutdown-title">Shut Down Windows</span>
            <CloseButton
              type="button"
              aria-label="Stay on this page"
              onClick={onClose}
            >
              x
            </CloseButton>
          </Header>
          <WindowContent>
            <Prompt>{prompt.text}</Prompt>
            <Actions>
              <Button type="button" onClick={handleStay}>
                {prompt.stay}
              </Button>
              <Button type="button" onClick={handleLeave}>
                {prompt.leave}
              </Button>
            </Actions>
          </WindowContent>
        </DialogWindow>
      </DialogBackdrop>,
      document.body
    );
  }

  if (phase === 'celebration') {
    return createPortal(
      <CelebrationLayer>
        {confetti.map((piece) => (
          <ConfettiPiece
            key={piece.id}
            aria-hidden="true"
            $color={piece.color}
            $delay={piece.delay}
            $size={piece.size}
            $star={piece.star}
            style={{ '--dx': piece.dx, '--dy': piece.dy }}
          />
        ))}
        <CelebrationMessage>{celebrationMessage}</CelebrationMessage>
      </CelebrationLayer>,
      document.body
    );
  }

  if (phase === 'leaving' || phase === 'crt') return null;

  if (phase === 'black') {
    return createPortal(
      <BlackScreen
        role="status"
        aria-live="polite"
        onClick={startBoot}
      >
        <div>
          &gt; Restarting in {countdown}...
          <br />
          <br />
          &gt; (press any key or click to restart now)
        </div>
      </BlackScreen>,
      document.body
    );
  }

  return createPortal(
    <BootScreen role="status" aria-live="polite">
      <BootMessage>Starting Windows 95...</BootMessage>
      <ProgressTrack>
        <ProgressBar />
      </ProgressTrack>
    </BootScreen>,
    document.body
  );
};

export default ShutdownExperience;
