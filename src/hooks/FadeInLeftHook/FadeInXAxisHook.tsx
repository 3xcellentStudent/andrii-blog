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

const keyframe = ({ fromX, toX }: FadeInProps["$xaxis"]) => keyframes`
  0% {
    transform: translateX(${fromX}%);
  }
  100% {
    transform: translateX(${toX}%);
  }
`;

const FadeInDiv = styled.div<FadeInProps>`
  position: relative;
  animation-name: ${({ $xaxis }) => keyframe($xaxis)};
  animation-duration: ${({ $duration }) => $duration};
  animation-delay: ${({ $delay }) => $delay};
  animation-fill-mode: forwards;
  animation-timing-function: ease;
`;

function FadeInXAxisHook({
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

export default memo(FadeInXAxisHook);