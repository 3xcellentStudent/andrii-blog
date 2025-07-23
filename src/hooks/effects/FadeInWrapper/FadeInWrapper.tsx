import { memo, ReactNode } from "react"
import styled, { keyframes } from "styled-components";

interface ComponentProps {
  tag: string
  children: ReactNode
  className: string
  duration: string
  delay: string
  styles: string
}

interface FadeInProps {
  $delay: string
  $duration: string
  children: ReactNode
  styles: string
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  } 45% {
    opacity: 1;
    transform: scale(1);
  } 65% {
    opacity: 1;
    transform: scale(1.2);
  } 80% {
    opacity: 1;
    transform: scale(1);
  } 100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const FadeInDiv = styled.div<FadeInProps>`
  ${(({styles}) => styles)}
  animation-name: ${fadeIn};
  animation-duration: ${(({$duration}) => $duration)};
  animation-delay: ${(({$delay}) => $delay)};
  animation-fill-mode: forwards;
  animation-timing-function: ease;
`;

function FadeInWrapper({tag, children, className, delay, duration, styles}: ComponentProps){

  return(
    <FadeInDiv as={tag} $delay={delay} styles={styles} $duration={duration} className={`${className || ""}`}>
      {children}
    </FadeInDiv>
  );
}

export default memo(FadeInWrapper);