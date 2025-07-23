import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useObserver(threshold: number){

const [mapElements, setMapElements] = useState(
  new Map<Element, Dispatch<SetStateAction<boolean[]>>>()
);

  useEffect(() => {
    if (mapElements.size === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        mapElements.entries().forEach(([element, callback], index) => {
          if (element === target) callback((prev: boolean[]) => {
            const copy = [...prev];
            copy[index] = isIntersecting;
            return copy;
          });
        });
      });
    }, { threshold });

    mapElements.forEach((callback, el) => {
      observer.observe(el);
    });

    return () => {
      mapElements.forEach((callback, el) => {
        observer.unobserve(el);
      });
    };
  }, [mapElements]);

  const observe = (element: Element, callback: Dispatch<SetStateAction<boolean[]>>) => {
    setMapElements((prev) => {
      const newMap = new Map(prev);
      newMap.set(element, callback);
      return newMap;
    });
  };

  return { observe };
}