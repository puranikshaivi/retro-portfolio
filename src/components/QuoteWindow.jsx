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
      <Header>
        <span>Windows 95</span>
        <Button size="sm" square>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>
      <WindowContent>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4 }}>
          You keep checking the date. You must be confused. It's 1995. That
          feeling that you installed Windows 95 a long time ago is just
          confusion. Windows 95 will now run Solitaire to comfort you.
        </p>
      </WindowContent>
    </StyledWindow>
  );
};

export default QuoteWindow;
