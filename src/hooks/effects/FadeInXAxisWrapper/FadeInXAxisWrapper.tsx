import { memo, ReactNode } from "react";
import styled, { keyframes } from "styled-components";

interface ComponentProps {
  tag?: string;
  children: ReactNode;
  className?: string;
  duration: string;
  delay?: string;
  xaxis: { fromX: number; toX: number };
}

interface FadeInProps {
  $duration: string;
  $delay: string;
  $xaxis: { fromX: number; toX: number };
}

const FadeInDiv = styled.div<FadeInProps>`
  position: relative;
  transform: ${({ $xaxis }) => `translateX(${($xaxis.fromX)}%)`};
  transition: ${({ $duration, $delay }) => `${$duration} ease ${$delay}`}
`;

function FadeInXAxisWrapper({
  tag,
  children,
  className,
  delay,
  duration,
  xaxis,
}: ComponentProps) {
  return (
    <FadeInDiv
      as={tag}
      $xaxis={xaxis}
      $delay={delay || "0ms"}
      $duration={duration}
      className={className}
    >
      {children}
    </FadeInDiv>
  );
}

export default memo(FadeInXAxisWrapper);