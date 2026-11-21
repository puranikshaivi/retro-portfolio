import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled from 'styled-components';

const StyledWindow = styled(Window)`
  width: 500px;
  font-family: 'ms_sans_serif';

  @media (max-width: 600px) {
    width: min(500px, calc(100vw - 32px));
    max-width: 100%;
  }
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuRow = styled.div`
  display: flex;
  gap: 14px;
  padding: 3px 6px;
  font-size: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderDark};
`;

// Real Notepad renders its chrome (title bar, menus) in the system font
// but the document body in a monospace font — that contrast is what
// makes it read as "typed text" rather than more OS chrome.
const TextArea = styled.div`
  background: #fff;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};
  margin: 4px;
  padding: 10px 12px;
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #1a1a1a;
`;

const Line = styled.p`
  margin: 0;
`;

const Cursor = styled.span`
  display: inline-block;
  animation: blink 1s steps(1) infinite;

  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2px 8px;
  margin: 0 4px 4px;
  font-size: 11px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};
`;

const facts = [
  "I love reading books and I have a big collection at our house in Mumbai.",
  "Harry Potter, Percy Jackson, LOTR and Narnia, but also Agatha Christie and Feluda.",
  "Infinity War is better than Endgame. And Loki is the best.",
  "Kind of a perfectionist, and also a bit of a procrastinator, which is a weird combo but not uncommon apparently.",
  "Coffee is the secret of my energy.",
  "Anyone with a cat, or multiple, is automatically my friend without introduction.",
  "I have a Valorant sticker on my laptop and I've played for a total of 4 days only.",
  "I love playing card games, and I am insanely competitive.",
  "Also love playing carrom and pool though I am not very good. Jk, I am very good.",

];

const NotepadWindow = ({ onClose }) => {
  return (
    <StyledWindow>
      <Header className="drag-handle">
        <span>README.txt - Notepad</span>
        <Button
          size="sm"
          square
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>

      <MenuRow>
        <span>File</span>
        <span>Edit</span>
        <span>Search</span>
        <span>Help</span>
      </MenuRow>

      <WindowContent style={{ padding: 0 }}>
        <TextArea>
            <Line><b>Things about me that don't fit on my resume:</b></Line>
          {facts.map((fact, i) => (
            <Line key={i}>
              - {fact}
              {i === facts.length - 1 && <Cursor>|</Cursor>}
            </Line>
          ))}
        </TextArea>
        <StatusBar>Ln {facts.length+1}, Col 1</StatusBar>
      </WindowContent>
    </StyledWindow>
  );
};

export default NotepadWindow;