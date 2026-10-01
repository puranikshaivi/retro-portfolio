import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled from 'styled-components';

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

const Body = styled.div`
  display: flex;
  gap: 8px;
`;

const CoverWrap = styled.div`
  flex-shrink: 0;
`;

const Cover = styled.img`
  width: 90px;
  height: 100px;
  object-fit: cover;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};

  @media (max-width: 600px) {
    width: 72px;
    height: 80px;
  }
`;

const InfoCol = styled.div`
  flex: 1;
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
  background: ${({ theme }) => theme.canvas || '#fff'};
  border: 1px solid ${({ theme }) => theme.borderDark};
  padding: 2px 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const SongWindow = ({
  coverSrc = '../assets/purple-rain-album.jpg',
  artist = 'Prince and the Revolution',
  track = 'Purple Rain',
}) => {
  return (
    <StyledWindow>
      <Header className="drag-handle">
        <span>CD Player</span>
        <Button size="sm" square>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>
      <WindowContent>
        <Body>
          <CoverWrap>
            <Cover src={coverSrc} alt={`${artist} — ${track}`} />
          </CoverWrap>

          <InfoCol>
            <Row>
              <Label>Artist:</Label>
              <Field>{artist}</Field>
            </Row>
            <Row>
              <Label>Track:</Label>
              <Field>{track}</Field>
            </Row>

            <Controls>
              <CtrlButton>|◀◀</CtrlButton>
              <CtrlButton>▶</CtrlButton>
              <CtrlButton>❚❚</CtrlButton>
              <CtrlButton>■</CtrlButton>
              <CtrlButton>▶▶|</CtrlButton>
            </Controls>
          </InfoCol>
        </Body>
      </WindowContent>
    </StyledWindow>
  );
};

export default SongWindow;
