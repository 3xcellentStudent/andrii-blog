import { collection, getDocs, query } from "firebase/firestore";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import firestore from "@/services/firebase/firebase";


export default async function Writings(){
  
  // let state: string[] = [];
  
  // const queryByCollection = query(collection(firestore, "writings"));

  // const querySnapshot = await getDocs(queryByCollection);
  // querySnapshot.forEach((doc) => {
  //   const summary = doc.data() as string[];

  //   state = summary;
  // })

  const state: {title: string, }[] = [

  ]

  return(
    state &&
    <section >
      <SectionTitle text="Writings" />
      <div>
        <ul>

        </ul>
      </div>
    </section>
  )
}