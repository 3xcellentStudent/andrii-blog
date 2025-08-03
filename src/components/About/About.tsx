import { Fragment } from "react"
import styles from "./about.module.css"
import { collection, getDocs, query } from "firebase/firestore";
import firestore from "@/services/firebase/firebase";
import SectionTitle from "../common/SectionTitle/SectionTitle";

export default async function About(){

  const queryByCollection = query(collection(firestore, "about"));

  let state: string[] = [];

  const querySnapshot = await getDocs(queryByCollection);
  querySnapshot.forEach((doc) => {
    const summary = doc.data().summary as string[];

    state = summary;
  })

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