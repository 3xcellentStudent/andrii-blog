import GitHubSVG from "@/components/svg/contacts/GitHubSVG"
import LinkedinSVG from "@/components/svg/contacts/LinkedinSVG"
import WhatsAppSVG from "@/components/svg/contacts/WhatsAppSVG"
import styles from "./contacts.module.css"
import { useEffect, useState } from "react"
import firestore from "@/services/firebase/firebase"
import { collection, getDocs, query } from "firebase/firestore"
import { ContactsTypeFromDb, ContactsTypeWithSVG } from "@/types/contacts.types"
import GmailSVG from "@/components/svg/contacts/GmailSVG"


export default function Contacts(){

  const [state, setState] = useState<ContactsTypeWithSVG[]>([])

  const $svgArray = [GitHubSVG, LinkedinSVG, WhatsAppSVG, GmailSVG]

  useEffect(() => {
    getData()
  }, [])

  async function getData(){
    const queryByCollection = query(collection(firestore, "contacts"));

    const querySnapshot = await getDocs(queryByCollection);
    querySnapshot.docs.forEach((docs) => 
      (docs.data() as {links: ContactsTypeFromDb[]}).links.forEach((doc, index) => {
        const $svg = $svgArray[index]
        const object: ContactsTypeWithSVG = {$svg, ...doc as {source: ContactsTypeFromDb["source"], type: ContactsTypeFromDb["type"]}}
        setState(prev => [...prev, object])
      })
    );
  }

  return(
    <div className={styles.container}>
      <ul className={styles.list}>{
        state?.map(({$svg, source, type}, index) => {
          return(
            <li key={index} className={styles.list_item}>
              <a target="_blank" className={styles.link} href={type === "mailto" ? `mailto:${source}` : source}>
                <$svg className={styles.svgrepo_color} />
              </a>
            </li>
          )
        })
      }</ul>
    </div>
  )
}