
import { Fragment, memo, useEffect, useRef, useState, } from "react"
import SectionTitle from "../common/SectionTitle/SectionTitle"
import styles from "./skills.module.css"
import FadeInHook from "@/hooks/FadeInHook/FadeInHook";
import firestore from "@/services/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import SkillsType from "@/types/skills.types";
import styled from "styled-components";
import useObserver from "@/hooks/useObserver/useObserver";

const ListItemPreObserved = styled.li<{background: string}>`
  background: ${({background}) => (background)};
  border: 2px solid ${({background}) => (background)};
  &:hover {
    color: ${({background}) => (background)};
  }
`;

function Skills(){

  const [state, setState] = useState<SkillsType[] | []>([])
  const [intersectingArray, setIntersectingArray] = useState<boolean[]>([])
  const SectionRef = useRef(null);

  const {observe} = useObserver(.8);

  useEffect(() => {
    if(!!SectionRef.current){
      observe(SectionRef.current, setIntersectingArray);
    }
  }, [!!state.length]);

  useEffect(() => {
    getData()
  }, [])

  async function getData(){
    const queryByCollection = query(collection(firestore, "skills"));

    const querySnapshot = await getDocs(queryByCollection);
    querySnapshot.forEach((doc) => {
      setState(prev => [...prev, doc.data() as SkillsType])
    });
  }

  const itemListStylesString = (background: string) => `
    background: ${background};
    &:hover {
      color: ${background};
      border: 2px solid ${background};
    }
  `;

  return(
    <>
    {
      !!state.length && 
      <section ref={SectionRef} className="container section_anchor">
        <SectionTitle text="Skills" className={styles.title} />
        <ul className={styles.skills_list}>
          {state?.map(({array, background, name}, index) => {
            return(
              <Fragment key={name + index + ""}>
                {array.map((value, index) => {
                  return(
                    <Fragment key={index + name + ""}>
                      {
                        intersectingArray[0] ? 
                        <FadeInHook styles={itemListStylesString(background)} tag="li" className={styles.item} delay={index * 50 + 100 + "ms"} duration="300ms" key={name + index + ""}>
                          {value}
                        </FadeInHook>
                        : <ListItemPreObserved background={background} className={`${styles.item} ${styles.item_pre_observed}`}>{value}</ListItemPreObserved>
                      }
                    </Fragment>
                  );
                })}
              </Fragment>
            )
          })}
        </ul>
      </section>
    }
    </>
  );
}

export default memo(Skills);