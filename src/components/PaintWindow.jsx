import { useEffect, useRef, useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Separator } from 'react95';
import styled from 'styled-components';

const StyledWindow = styled(Window)`
  width: 420px;
  font-family: 'ms_sans_serif';

  @media (max-width: 600px) {
    width: min(320px, calc(100vw - 22px));
    max-width: calc(100vw - 22px);
    margin-left: 0;
  }
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuRow = styled(Toolbar)`
  padding: 2px 4px;
  font-size: 12px;
`;

const Body = styled.div`
  display: flex;
`;

// left-hand tool strip, purely decorative/static
const ToolStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  padding: 4px;
  border-right: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} transparent transparent transparent;
`;

const ToolButton = styled(Button)`
  width: 22px;
  height: 22px;
  padding: 0;
  font-size: 12px;
`;

const Canvas = styled.div`
  flex: 1;
  margin: 4px;
  background: repeating-conic-gradient(#fff 0% 25%, #e0e0e0 0% 50%) 0 / 16px 16px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderDark} ${({ theme }) => theme.borderLight}
    ${({ theme }) => theme.borderLight} ${({ theme }) => theme.borderDark};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  overflow: hidden;

  @media (max-width: 600px) {
    min-height: 250px;
  }
`;

const Photo = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  image-rendering: auto;
  background: #f5f5f5;

  @media (max-width: 600px) {
    max-height: 220px;
  }
`;

const Palette = styled.div`
  display: flex;
  gap: 2px;
  padding: 4px;
`;

const Swatch = styled.div`
  width: 14px;
  height: 14px;
  background: ${({ color }) => color};
  border: 1px solid #808080;
`;

const tools = [
  { label: '✎', filter: 'none' },
  { label: '◐', filter: 'grayscale(0.9)' },
  { label: '◑', filter: 'sepia(0.45) saturate(1.15) contrast(1.02)' },
  { label: '✚', filter: 'contrast(1.12) saturate(1.2)' },
  { label: '▲', filter: 'sepia(0.15) saturate(1.15) hue-rotate(-5deg) brightness(1.03)' },
  { label: '▼', filter: 'saturate(1.1) hue-rotate(180deg) brightness(1.02) contrast(1.03)' },
  { label: '■', filter: 'contrast(1.25) brightness(0.95)' },
  { label: '◆', filter: 'contrast(1.3) saturate(1.3) brightness(1.02)' },
  { label: '▦', filter: 'sepia(0.2) contrast(0.95) brightness(1.05) saturate(0.85)' },
  { label: '◧', filter: 'grayscale(0.4) contrast(1.1) brightness(0.98)' },
  { label: '◨', filter: 'brightness(1.15) contrast(0.97) saturate(0.95)' },
  { label: '▧', filter: 'saturate(0.65) contrast(1.02)' },
  { label: '◇', filter: 'saturate(1.15) hue-rotate(190deg) brightness(1.05) contrast(0.98)' },
  { label: '▣', filter: 'contrast(1.18) brightness(1.02) saturate(1.05)' },
  { label: '□', filter: 'brightness(1.2) contrast(0.95) saturate(0.9)' },
  { label: '◎', filter: null, distort: 'fisheye' },   // Fisheye
  { label: '↺', filter: 'none' },
];

// const colors = [
//   '#1a1a1a', '#4d4d4d', '#7a2e2e', '#8a6d1f',
//   '#2f6b4f', '#2a7a7a', '#2e4d7a', '#5c2e6b',
//   '#ffffff', '#b3b3b3', '#e6483c', '#e8b93f',
//   '#5cb85c', '#3fc1c9', '#4a90d9', '#c77bb5',
//   '#f2a488', '#d4a373', '#87a878', '#c9a0dc',
// ];

const colors = [
  '#000000', '#5a5a5a', '#b32424', '#d4a017',
  '#1e8449', '#17a2a2', '#1f4fb0', '#8e2fc2',
  '#ffffff', '#d9d9d9', '#ff3b30', '#ffd60a',
  '#34d058', '#00e5e5', '#3d8bff', '#ff4fd8',
  '#ff8c42', '#ffb347', '#7ed957', '#c084fc',
];

function applyFisheye(ctx, width, height, strength = 0.4) {
  const srcData = ctx.getImageData(0, 0, width, height);
  const dstData = ctx.createImageData(width, height);
  const src = srcData.data;
  const dst = dstData.data;

  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(cx, cy);
  const power = 1 + strength; // very gentle lens warp

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) / maxRadius;

      let srcX = x;
      let srcY = y;

      if (dist < 1 && dist > 0) {
        const newDist = Math.pow(dist, power); // pulls samples inward -> center bulges
        const factor = newDist / dist;

        srcX = cx + dx * factor;
        srcY = cy + dy * factor;
      }

      srcX = Math.min(width - 1, Math.max(0, Math.round(srcX)));
      srcY = Math.min(height - 1, Math.max(0, Math.round(srcY)));

      const srcIdx = (srcY * width + srcX) * 4;
      const dstIdx = (y * width + x) * 4;

      dst[dstIdx] = src[srcIdx];
      dst[dstIdx + 1] = src[srcIdx + 1];
      dst[dstIdx + 2] = src[srcIdx + 2];
      dst[dstIdx + 3] = src[srcIdx + 3];
    }
  }

  ctx.putImageData(dstData, 0, 0);
}

const PaintWindow = ({ photoSrc = '/IMG_6155.jpg' }) => {
  const [filter, setFilter] = useState('none');
  const [distortion, setDistortion] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const targetW = canvas.clientWidth || 300;
      const targetH = canvas.clientHeight || 260;
      const scale = Math.min(targetW / img.naturalWidth, targetH / img.naturalHeight);
      const drawW = Math.max(1, img.naturalWidth * scale);
      const drawH = Math.max(1, img.naturalHeight * scale);

      canvas.width = drawW;
      canvas.height = drawH;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = filter || 'none';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (distortion === 'fisheye') {
        applyFisheye(ctx, canvas.width, canvas.height, 0.08);
      }
    };

    img.src = photoSrc;
  }, [photoSrc, filter, distortion]);

  const handleToolClick = (tool) => {
    if (tool.distort) {
      setDistortion(tool.distort);
      setFilter(tool.filter || 'none');
      return;
    }

    setDistortion(null);
    setFilter(tool.filter || 'none');
  };

  return (
    <StyledWindow>
      <Header className="drag-handle">
        <span>meow - Paint</span>
        <Button size="sm" square>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </Header>

      <MenuRow>
        <span style={{ marginRight: 10 }}>File</span>
        <span style={{ marginRight: 10 }}>Edit</span>
        <span style={{ marginRight: 10 }}>View</span>
        <span style={{ marginRight: 10 }}>Image</span>
        <span>Help</span>
      </MenuRow>
      <Separator />

      <WindowContent style={{ padding: 0 }}>
        <Body>
          <ToolStrip>
            {tools.map((t) => (
              <ToolButton key={t.label} size="sm" onClick={() => handleToolClick(t)}>
                {t.label}
              </ToolButton>
            ))}
          </ToolStrip>

          <Canvas>
            <Photo ref={canvasRef} />
          </Canvas>
        </Body>

        <Palette>
          {colors.map((c) => (
            <Swatch key={c} color={c} />
          ))}
        </Palette>
      </WindowContent>
    </StyledWindow>
  );
};

export default PaintWindow;
