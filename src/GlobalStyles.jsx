import { createGlobalStyle } from 'styled-components';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  /* Page fonts — Kelly Slab for the hero heading, Sintony for everything else
     outside the popups. Popups keep the ms_sans_serif Win95 look. */
  @import url('https://fonts.googleapis.com/css2?family=Kelly+Slab&family=Sintony:wght@400;700&display=swap');

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  /* react95 popups (Window, AppBar, Button, etc.) explicitly opt into
     ms_sans_serif in their own components, so this default only affects
     regular page content. */
  body, input, select, textarea {
    font-family: 'Sintony', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body, #root {
    min-height: 100%;
    height: 100%;
  }

  section[id], [id] {
    scroll-margin-top: 90px;
  }

  body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    background: #ffffff;
  }
`;

export default GlobalStyles;
