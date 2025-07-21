import { Fragment, memo, useEffect, useState } from "react"
import styles from "./about.module.css"
import { collection, getDocs, query } from "firebase/firestore";
import firestore from "@/services/firebase/firebase";
import SectionTitle from "../common/SectionTitle/SectionTitle";

function About(){

  const [state, setState] = useState<string[] | []>([])

  useEffect(() => {
    getData()
  }, [])

  async function getData(){
    const queryByCollection = query(collection(firestore, "about"));

    const querySnapshot = await getDocs(queryByCollection);
    querySnapshot.forEach((doc) => {
      const data = doc.data().summary as string[];
      setState(data)
    });
  }

  return(
    <>
    {
      !!state.length && 
      <section className={`section_anchor ${styles.container}`}>
        <SectionTitle text="About" className={styles.title} />
        {state?.map((item, index) => {
          return(
            <Fragment key={index}>
              <p className={styles.paragraph} key={index}>{item}</p>
              <br />
            </Fragment>
          )
        })}
      </section>
    }
    </>
  );
}

export default memo(About);