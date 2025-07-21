import { Fragment, memo, ReactNode, useEffect, useRef, useState } from "react"
import SectionTitle from "../common/SectionTitle/SectionTitle"
import CardItem from "./components/CardItem/CardItem"
import styles from "./experience.module.css"
import { collection, getDocs, query, } from "firebase/firestore"
import firestore from "@/services/firebase/firebase"
import ExperienceType from "@/types/experience.types"
import FadeInXAxisHook from "@/hooks/FadeInLeftHook/FadeInXAxisHook"
import useObserver from "@/hooks/useObserver/useObserver"

function LinkWrapper({props, index, intersectingArray}: {
  props: ExperienceType, index: number, intersectingArray: boolean[]
}){

  return(
    <a target="_blank" className={`${styles.item_container} ${styles.item_container_link}`} href={props?.link}>
      {
        intersectingArray[index] ?
        <FadeInXAxisHook key={index} duration="300ms" tag="div" xaxis={{fromX: -10, toX: 0}} >
          <CardItem props={{...props}} />
        </FadeInXAxisHook> :
        <li className={styles.invisible}>
          <CardItem key={index} props={{...props}} />
        </li>
      }
    </a>
  )
}

function Experience(){

  const [state, setState] = useState<ExperienceType[] | []>([]);
  const [intersectingArray, setIntersectingArray] = useState<boolean[]>([]);
  const SectionRef = useRef<HTMLUListElement | null>(null);

  const {observe} = useObserver(.5);

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

            return(
              props?.link ? 
              <Fragment key={index}>
                <LinkWrapper index={index} intersectingArray={intersectingArray} props={props} />
              </Fragment> : 
              <li className={styles.invisible}>
                <CardItem key={index} props={{...props}} />
              </li>
              // <div className={styles.item_container} key={index}>
              //   {props?.link && <a target="_blank" className={styles.link_to_resource} href={props?.link}></a>}
              //   {
              //     intersectingArray[index] ?
              //     <FadeInXAxisHook key={index} duration="300ms" tag="div" xaxis={{fromX: -10, toX: 0}} >
              //       <CardItem props={{...props}} />
              //     </FadeInXAxisHook> :
                  // <li className={styles.invisible}>
                  //   <CardItem key={index} props={{...props}} />
                  // </li>
              //   }
              // </div>
            );
          }
          )}
      </ul>
    </section>
  );
}

export default memo(Experience);