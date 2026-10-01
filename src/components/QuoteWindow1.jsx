import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled from 'styled-components';

const StyledWindow = styled(Window)`
  width: 420px;
  font-family: 'ms_sans_serif';
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuoteWindow = () => {
  return (
    <StyledWindow>
      <Header className="drag-handle">
        <span>Windows 95</span>
        <Button size="sm" square>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>
      <WindowContent>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4 }}>
          System ready.
          Portfolio loaded successfully.
          Click around to discover my work and a little more about me.
        </p>
      </WindowContent>
    </StyledWindow>
  );
};

export default QuoteWindow;
