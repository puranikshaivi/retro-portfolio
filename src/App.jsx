import styled, { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import GlobalStyles from './GlobalStyles';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

const AppShell = styled.div`
  padding-top: 48px;
`;

function App() {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <AppShell>
        <NavBar />
        <LandingPage />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
