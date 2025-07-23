import { Fragment, memo, ReactNode, useEffect, useRef, useState } from "react"
import SectionTitle from "../common/SectionTitle/SectionTitle"
import CardItem from "./components/CardItem/CardItem"
import styles from "./experience.module.css"
import { collection, getDocs, query, } from "firebase/firestore"
import firestore from "@/services/firebase/firebase"
import ExperienceType from "@/types/experience.types"
import FadeInXAxisWrapper from "@/hooks/effects/FadeInXAxisWrapper/FadeInXAxisWrapper"
import useObserver from "@/hooks/useObserver/useObserver"

function Experience(){

  const [state, setState] = useState<ExperienceType[] | []>([]);
  const [intersectingArray, setIntersectingArray] = useState<boolean[]>([]);
  const SectionRef = useRef<HTMLUListElement | null>(null);

  const {observe} = useObserver(.7);

  useEffect(() => {
    setData()
  }, [])

  useEffect(() => {
    if(!!SectionRef.current){
      Array.from(SectionRef.current.children).forEach((el) => {
        observe(el, setIntersectingArray);
      })
    }
  }, [!!state.length]);

  const fadeInXAxisWrapperProps = (index: number) => {
    return {
      duration: "300ms", 
      tag: "div", 
      delay: intersectingArray[index] ? "0ms" : "100ms", 
      xaxis: intersectingArray[index] ? {fromX: 0, toX: -10} : {fromX: -10, toX: 0},
    }
  }
  
  async function setData(){
    const queryByCollection = query(collection(firestore, "experience"));

    const querySnapshot = await getDocs(queryByCollection);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as ExperienceType;
      setState(prev => [...prev, data]);
    });
  }

  return(
    !!state.length && 
    <section className="container section_anchor">
      <SectionTitle text="Experience" />
      <ul ref={SectionRef} className={styles.list}>
          {state?.map((props, index) => {
            const isActive = intersectingArray[index];
            return(
              props?.link ? 
              <a target="_blank" key={index} className={`${styles.item_container_link}`} href={props?.link}>
                <FadeInXAxisWrapper {...fadeInXAxisWrapperProps(index)} >
                  <CardItem isActive={isActive} props={{...props}} />
                </FadeInXAxisWrapper>
              </a> : 
              <FadeInXAxisWrapper key={index} {...fadeInXAxisWrapperProps(index)}>
                <CardItem isActive={isActive} props={{...props}} />
              </FadeInXAxisWrapper>
            );
          }
          )}
      </ul>
    </section>
  );
}

export default memo(Experience);