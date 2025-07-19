'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import styled from "styled-components";

const StyledDiv = styled.div<{x: number, y: number}>`
  background: radial-gradient(500px at ${(({x}) => (x))}px ${(({y}) => (y))}px, oklch(27.8% 0.033 256.848), transparent 80%);
`;

export default function Home(){

  const aboutRef = useRef<HTMLDivElement | null>(null)

  const [position, setPosition] = useState({x: 0, y: 0})

  function mouseMoveHandler(e: MouseEvent){
    setPosition({x: e.pageX, y: e.pageY});
  }

  useEffect(() => {
    window.onmousemove = (e) => mouseMoveHandler(e);

    return () => window.removeEventListener("pointermove", mouseMoveHandler);
  }, [])

  return (
    <StyledDiv x={position.x} y={position.y}>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <div ref={aboutRef}>
            <About/>
          </div>
          <div>
            <Skills/>
          </div>
          <div>
            <Experience/>
          </div>
        </main>
      </div>
    </StyledDiv>
  );
}
