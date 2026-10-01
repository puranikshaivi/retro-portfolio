import { AppBar, Toolbar, Button, Separator, MenuList, MenuListItem } from 'react95';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    min-width: 0;
    gap: 4px;

    & > button:not(:last-child),
    & > [role='separator'] {
      display: none;
    }
  }
`;

const StyledAppBar = styled(AppBar)`
  font-family: 'ms_sans_serif';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10000;
  align-self: flex-start;

  @media (max-width: 600px) {
    overflow: visible;
  }
`;

const TrayGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 6px;
`;

const IconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &:hover .tray-tooltip {
    display: block;
  }
`;

const TrayIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const BatteryLabel = styled.span`
  font-size: 11px;
  margin-left: 2px;
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  background: #ffffe1;
  border: 1px solid #000;
  padding: 3px 6px;
  font-size: 11px;
  white-space: nowrap;
  z-index: 10000;
`;

const StartWrap = styled.div`
  position: relative;
`;

const StartMenu = styled(MenuList)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 2px;
  width: 200px;
  z-index: 10000;

  @media (max-width: 600px) {
    width: min(200px, calc(100vw - 24px));
  }
`;

const MenuIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const NavBar = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [muted, setMuted] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // close the start menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (startRef.current && !startRef.current.contains(e.target)) {
        setStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      setStartOpen(false);
      return;
    }

    const offset = 72;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setStartOpen(false);
  };

  return (
    <StyledAppBar>
      <Toolbar style={{ justifyContent: 'space-between', width: '100%' }}>
        <StartWrap ref={startRef}>
          <Button
            variant="menu"
            active={startOpen}
            style={{ fontWeight: 'bold' }}
            onClick={() => setStartOpen((o) => !o)}
          >
            <img
              src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
              alt=""
              style={{ width: 20, height: 20, marginRight: 6 }}
            />
            Start
          </Button>

          {startOpen && (
            <StartMenu>
              <MenuListItem onClick={() => scrollTo('about')}>
                <MenuIcon
                  src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png"
                  alt=""
                />
                About
              </MenuListItem>
              <MenuListItem onClick={() => scrollTo('experience')}>
                <MenuIcon
                  src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png"
                  alt=""
                />
                Experience
              </MenuListItem>
              <MenuListItem onClick={() => scrollTo('projects')}>
                <MenuIcon
                  src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-5.png"
                  alt=""
                />
                Projects
              </MenuListItem>
              <MenuListItem onClick={() => scrollTo('contact')}>
                <MenuIcon
                  src="https://win98icons.alexmeub.com/icons/png/modem-4.png"
                  alt=""
                />
                Contact
              </MenuListItem>
              <Separator />
              <MenuListItem
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.setAttribute('download', 'Shaivi_Puranik_Resume.pdf');
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setStartOpen(false);
                }}
              >
                <MenuIcon
                  src="https://win98icons.alexmeub.com/icons/png/address_book_pad.png"
                  alt=""
                />
                DownloadResume
              </MenuListItem>
              <Separator />
              <MenuListItem
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setStartOpen(false);
                }}
              >
                <MenuIcon
                  src="https://win98icons.alexmeub.com/icons/png/shut_down_normal-0.png"
                  alt=""
                />
                Shut Down...
              </MenuListItem>
            </StartMenu>
          )}
        </StartWrap>

        <Right>
          <Button variant="menu" onClick={() => scrollTo('about')}>About</Button>
          <Button variant="menu" onClick={() => scrollTo('experience')}>Experience</Button>
          <Button variant="menu" onClick={() => scrollTo('projects')}>Projects</Button>
          <Button variant="menu" onClick={() => scrollTo('contact')}>Contact</Button>
          <Button
            variant="menu"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.setAttribute('download', 'Shaivi_Puranik_Resume.pdf');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            DownloadResume
          </Button>
          <Separator orientation="vertical" style={{ margin: '0 4px' }} />

          <TrayGroup>
            {/* volume — click to toggle mute/unmute */}
            <IconWrap $clickable onClick={() => setMuted((m) => !m)}>
              <TrayIcon
                src={
                  muted
                    ? 'https://win98icons.alexmeub.com/icons/png/loudspeaker_muted-0.png'
                    : 'https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png'
                }
                alt={muted ? 'Muted' : 'Volume on'}
              />
            </IconWrap>

            {/* network — static icon, retro tooltip on hover */}
            <IconWrap>
              <TrayIcon
                src="https://win98icons.alexmeub.com/icons/png/conn_pcs_on_on.png"
                alt="Network status"
              />
              <Tooltip className="tray-tooltip">Connected at 33.6kbps</Tooltip>
            </IconWrap>

            {/* battery — static 67% */}
            <IconWrap>
              <TrayIcon
                src="https://win98icons.alexmeub.com/icons/png/battery.png"
                alt="Battery"
              />
              <BatteryLabel>67%</BatteryLabel>
            </IconWrap>
          </TrayGroup>

          <Separator orientation="vertical" style={{ margin: '0 4px' }} />
          <Button variant="menu">{time}</Button>
        </Right>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;