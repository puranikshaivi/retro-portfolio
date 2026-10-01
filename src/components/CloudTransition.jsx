import styled, { keyframes } from 'styled-components';

/**
 * Purely decorative "desktop sinking into the clouds" layer.
 * Drop <CloudTransition /> as the LAST child inside <Page> in LandingPage.jsx.
 * It's absolutely positioned and pointer-events: none, so it never blocks
 * clicks/drags on the real UI.
 */

// ---------- Win98 PNG icon field ----------
// These are intentionally image URLs rather than inline SVGs so the floating
// layer uses the same pixel-art language as the rest of the desktop.
const ICONS = {
  directory: 'https://win98icons.alexmeub.com/icons/png/directory_closed-1.png',
  search: 'https://win98icons.alexmeub.com/icons/png/magnifying_glass_4-0.png',
  padlock: 'https://win98icons.alexmeub.com/icons/png/key_padlock-1.png',
  envelope: 'https://win98icons.alexmeub.com/icons/png/envelope_closed-1.png',
  agent: 'https://win98icons.alexmeub.com/icons/png/msagent-0.png',
  windows: 'https://win98icons.alexmeub.com/icons/png/windows-4.png',
  world: 'https://win98icons.alexmeub.com/icons/png/world-1.png',
  recycle: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty_cool-1.png',
  explorer: 'https://win98icons.alexmeub.com/icons/png/msie1-3.png',
  question: 'https://win98icons.alexmeub.com/icons/png/help_question_mark-1.png',
  warning: 'https://win98icons.alexmeub.com/icons/png/msg_warning-2.png',
};

// Fixed, hand-placed layout so it never re-shuffles on re-render.
// The field stays quiet above and gathers toward the cloud transition below.
const PLACEMENTS = [
  { icon: 'windows', top: '30%', left: '55%', size: 22, opacity: 0.1, rotate: -8 },
  { icon: 'directory', top: '36%', left: '12%', size: 20, opacity: 0.12, rotate: 5 },
  { icon: 'world', top: '42%', left: '84%', size: 24, opacity: 0.14, rotate: -5 },
  { icon: 'search', top: '47%', left: '28%', size: 20, opacity: 0.16, rotate: -12 },
  { icon: 'envelope', top: '50%', left: '68%', size: 21, opacity: 0.18, rotate: 9 },
  { icon: 'explorer', top: '54%', left: '91%', size: 22, opacity: 0.2, rotate: 7 },
  { icon: 'agent', top: '57%', left: '46%', size: 23, opacity: 0.22, rotate: 8 },
  { icon: 'recycle', top: '60%', left: '7%', size: 22, opacity: 0.24, rotate: -4 },
  { icon: 'question', top: '63%', left: '77%', size: 20, opacity: 0.26, rotate: 12 },
  { icon: 'warning', top: '66%', left: '24%', size: 21, opacity: 0.28, rotate: -8 },
  { icon: 'directory', top: '69%', left: '58%', size: 20, opacity: 0.3, rotate: 6 },
  { icon: 'padlock', top: '72%', left: '88%', size: 21, opacity: 0.32, rotate: -10 },
  { icon: 'world', top: '75%', left: '13%', size: 21, opacity: 0.34, rotate: 7 },
  { icon: 'search', top: '77%', left: '38%', size: 19, opacity: 0.36, rotate: -5 },
  { icon: 'envelope', top: '77%', left: '70%', size: 20, opacity: 0.38, rotate: 10 },
  { icon: 'agent', top: '76%', left: '94%', size: 18, opacity: 0.4, rotate: -7 },
  { icon: 'padlock', top: '78%', left: '19%', size: 20, opacity: 0.42, rotate: 5 },
  { icon: 'explorer', top: '78%', left: '49%', size: 21, opacity: 0.44, rotate: -8 },
  { icon: 'recycle', top: '79%', left: '82%', size: 19, opacity: 0.46, rotate: 6 },
  { icon: 'question', top: '79%', left: '6%', size: 18, opacity: 0.48, rotate: -12 },
  { icon: 'warning', top: '80%', left: '31%', size: 18, opacity: 0.5, rotate: 9 },
  { icon: 'directory', top: '80%', left: '61%', size: 18, opacity: 0.52, rotate: -6 },
  { icon: 'windows', top: '79%', left: '91%', size: 16, opacity: 0.54, rotate: 8 },
  { icon: 'world', top: '81%', left: '14%', size: 17, opacity: 0.56, rotate: -5 },
  { icon: 'envelope', top: '81%', left: '43%', size: 17, opacity: 0.58, rotate: 7 },
  { icon: 'search', top: '81%', left: '74%', size: 17, opacity: 0.6, rotate: -9 },
  { icon: 'padlock', top: '83%', left: '27%', size: 16, opacity: 0.62, rotate: 5 },
  { icon: 'agent', top: '83%', left: '57%', size: 16, opacity: 0.64, rotate: -7 },
  { icon: 'recycle', top: '83%', left: '88%', size: 17, opacity: 0.66, rotate: 9 },
  { icon: 'question', top: '84%', left: '8%', size: 16, opacity: 0.68, rotate: -6 },
  { icon: 'warning', top: '84%', left: '38%', size: 15, opacity: 0.7, rotate: 11 },
  { icon: 'directory', top: '84%', left: '68%', size: 16, opacity: 0.72, rotate: -8 },
  { icon: 'windows', top: '84%', left: '97%', size: 15, opacity: 0.74, rotate: 6 },
  { icon: 'world', top: '86%', left: '20%', size: 15, opacity: 0.76, rotate: -10 },
  { icon: 'envelope', top: '86%', left: '51%', size: 15, opacity: 0.78, rotate: 8 },
  { icon: 'search', top: '86%', left: '80%', size: 15, opacity: 0.8, rotate: -5 },
  { icon: 'padlock', top: '88%', left: '34%', size: 14, opacity: 0.82, rotate: 7 },
  { icon: 'agent', top: '88%', left: '64%', size: 14, opacity: 0.84, rotate: -9 },
  { icon: 'explorer', top: '89%', left: '92%', size: 14, opacity: 0.86, rotate: 5 },
];

const drift = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
`;

const DriftLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  @media (max-width: 600px) {
    display: none; /* keep mobile clean, matches DesktopRow's own breakpoint */
  }
`;

const DriftIcon = styled.div`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  opacity: ${({ $opacity }) => $opacity};
  transform: rotate(${({ $rotate }) => $rotate}deg);
  animation: ${drift} ${({ $duration }) => $duration}s ease-in-out infinite;
`;

const PixelIcon = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.35));
`;

// ---------- cloud puffs at the seam ----------
// Solid white blobs give the boundary an actual cloud silhouette instead of
// relying on the gradient alone. Sits under DriftLayer's icons but above
// the teal background.
const CloudEdge = styled.svg`
  position: absolute;
  left: 0;
  bottom: -1px; /* avoid a 1px seam line */
  width: 100%;
  height: 150px;
  z-index: 0;
  pointer-events: none;

  @media (max-width: 600px) {
    height: 110px;
  }
`;

export const CloudTransition = () => (
  <>
    <CloudEdge viewBox="0 0 1440 150" preserveAspectRatio="none">
      <defs>
        <filter id="cloud-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#006363" floodOpacity="0.2" />
        </filter>
      </defs>
      <path
        d="M0,150 V104 H32 V92 H68 V82 H104 V88 H140 V100 H176 V94 H212 V78 H248 V70 H284 V78 H320 V94 H356 V102 H392 V88 H428 V76 H464 V64 H500 V72 H536 V88 H572 V98 H608 V86 H644 V72 H680 V62 H716 V70 H752 V86 H788 V98 H824 V84 H860 V72 H896 V58 H932 V66 H968 V82 H1004 V94 H1040 V84 H1076 V70 H1112 V62 H1148 V74 H1184 V88 H1220 V98 H1256 V84 H1292 V72 H1328 V82 H1364 V94 H1400 V86 H1440 V96 V150 Z"
        fill="#8fc9c9"
        opacity="0.46"
        filter="url(#cloud-shadow)"
      />
      <path
        d="M0,150 V116 H28 V104 H60 V96 H92 V104 H124 V114 H156 V108 H188 V92 H220 V84 H252 V92 H284 V106 H316 V116 H348 V104 H380 V90 H412 V80 H444 V88 H476 V102 H508 V112 H540 V104 H572 V90 H604 V80 H636 V88 H668 V102 H700 V114 H732 V104 H764 V90 H796 V78 H828 V86 H860 V100 H892 V110 H924 V102 H956 V88 H988 V78 H1020 V86 H1052 V100 H1084 V112 H1116 V104 H1148 V90 H1180 V82 H1212 V90 H1244 V104 H1276 V114 H1308 V104 H1340 V92 H1372 V100 H1404 V110 H1440 V104 V150 Z"
        fill="#d7f1f0"
        opacity="0.72"
      />
      <path
        d="M0,150 V128 H24 V116 H52 V108 H80 V116 H108 V126 H136 V120 H164 V106 H192 V98 H220 V106 H248 V120 H276 V130 H304 V122 H332 V108 H360 V98 H388 V104 H416 V118 H444 V128 H472 V120 H500 V106 H528 V96 H556 V104 H584 V118 H612 V128 H640 V120 H668 V108 H696 V98 H724 V106 H752 V120 H780 V130 H808 V122 H836 V108 H864 V98 H892 V106 H920 V120 H948 V128 H976 V120 H1004 V108 H1032 V100 H1060 V108 H1088 V120 H1116 V128 H1144 V120 H1172 V108 H1200 V100 H1228 V108 H1256 V120 H1284 V128 H1312 V120 H1340 V110 H1368 V116 H1396 V126 H1424 V118 H1440 V124 V150 Z"
        fill="#ffffff"
        opacity="0.78"
      />
      <path
        d="M0,150 V136 H20 V126 H44 V120 H68 V126 H92 V136 H116 V130 H140 V116 H164 V108 H188 V114 H212 V126 H236 V136 H260 V130 H284 V118 H308 V110 H332 V116 H356 V128 H380 V138 H404 V132 H428 V120 H452 V112 H476 V118 H500 V130 H524 V138 H548 V132 H572 V120 H596 V112 H620 V118 H644 V130 H668 V138 H692 V132 H716 V120 H740 V112 H764 V118 H788 V130 H812 V138 H836 V132 H860 V120 H884 V112 H908 V118 H932 V130 H956 V138 H980 V132 H1004 V120 H1028 V112 H1052 V118 H1076 V130 H1100 V138 H1124 V132 H1148 V120 H1172 V112 H1196 V118 H1220 V130 H1244 V138 H1268 V132 H1292 V120 H1316 V114 H1340 V122 H1364 V132 H1388 V138 H1412 V130 H1440 V136 V150 Z"
        fill="#ffffff"
        opacity="0.92"
      />
      <path
        d="M0,150 V142 H18 V134 H36 V128 H54 V134 H72 V142 H90 V136 H108 V124 H126 V118 H144 V124 H162 V136 H180 V144 H198 V138 H216 V126 H234 V120 H252 V126 H270 V138 H288 V146 H306 V140 H324 V128 H342 V116 H360 V128 H378 V140 H396 V146 H414 V140 H432 V128 H450 V122 H468 V128 H486 V140 H504 V146 H522 V140 H540 V128 H558 V122 H576 V128 H594 V140 H612 V146 H630 V140 H648 V128 H666 V122 H684 V128 H702 V140 H720 V146 H738 V140 H756 V128 H774 V122 H792 V128 H810 V140 H828 V146 H846 V140 H864 V128 H882 V122 H900 V128 H918 V140 H936 V146 H954 V140 H972 V128 H990 V122 H1008 V128 H1026 V140 H1044 V146 H1062 V140 H1080 V128 H1098 V122 H1116 V128 H1134 V140 H1152 V146 H1170 V140 H1188 V128 H1206 V122 H1224 V128 H1242 V140 H1260 V146 H1278 V140 H1296 V128 H1314 V126 H1332 V128 H1350 V140 H1368 V146 H1386 V140 H1404 V130 H1422 V136 H1440 V142 V150 Z"
        fill="#ffffff"
      />
    </CloudEdge>

    {/* <DriftLayer>
      {PLACEMENTS.map((p, i) => {
        return (
          <DriftIcon
            key={i}
            $top={p.top}
            $left={p.left}
            $size={p.size}
            $opacity={p.opacity}
            $rotate={p.rotate}
            $duration={5 + (i % 4)}
          >
            <PixelIcon src={ICONS[p.icon]} alt="" aria-hidden="true" />
          </DriftIcon>
        );
      })}
    </DriftLayer> */}
  </>
);

export default CloudTransition;