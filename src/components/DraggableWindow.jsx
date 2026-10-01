import { useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  z-index: ${({ $z }) => 9000 + $z};
  touch-action: none;

  @media (max-width: 600px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    margin-top: -40px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

// Wraps a popup window and makes it draggable — but only from an element
// carrying the `drag-handle` class inside it (i.e. the title bar), same as
// a real OS window. Clicking anywhere else in the window still brings it
// to front without starting a drag.
const DraggableWindow = ({ id, initialX, initialY, zIndex, onFocus, children }) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragState = useRef(null);

  const handlePointerDown = (e) => {
    onFocus?.(id);
    if (!e.target.closest('.drag-handle')) return;

    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current) return;
    const { startX, startY, originX, originY } = dragState.current;
    setPos({
      x: originX + (e.clientX - startX),
      y: originY + (e.clientY - startY),
    });
  };

  const handlePointerUp = (e) => {
    dragState.current = null;
    if (e.currentTarget.releasePointerCapture) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <Wrapper
      $x={pos.x}
      $y={pos.y}
      $z={zIndex}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}
    </Wrapper>
  );
};

export default DraggableWindow;
