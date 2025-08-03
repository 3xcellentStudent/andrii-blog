'use client'

import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div<{x: number, y: number}>`
  background: radial-gradient(500px at ${(({x}) => (x))}px ${(({y}) => (y))}px, oklch(27.8% 0.033 256.848), transparent 80%);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
`;

export default function GradientBg(){

  const [position, setPosition] = useState({x: 0, y: 0})

  function mouseMoveHandler(e: MouseEvent){
    setPosition({x: e.pageX, y: e.pageY});
  }

  useEffect(() => {
    window.onmousemove = (e) => mouseMoveHandler(e);

    return () => window.removeEventListener("pointermove", mouseMoveHandler);
  }, [])

  return(
    <StyledDiv x={position.x} y={position.y} />
  );
}