import { Fragment, memo, useEffect, useState } from "react"
import styles from "./about.module.css"
import { collection, getDocs, query } from "firebase/firestore";
import firestore from "@/services/firebase/firebase";
import SectionTitle from "../common/SectionTitle/SectionTitle";

function About(){

  // const array = [
  //   "I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.", 
  //   "Currently, I'm a Senior Front-End Engineer at Klaviyo, specializing in accessibility. I contribute to the creation and maintenance of UI components that power Klaviyo's frontend, ensuring our platform meets web accessibility standards and best practices to deliver an inclusive user experience.",
  //   "In the past, I've had the opportunity to develop software across a variety of settings — from advertising agencies and large corporations to start-ups and small digital product studios. Additionally, I also released a comprehensive video course a few years ago, guiding learners through building a web app with the Spotify API.",
  //   "In my spare time, I'm usually climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for Korok seedsKorok seeds."
  // ]

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