import GitHubSVG from "@/components/svg/contacts/GitHubSVG"
import LinkedinSVG from "@/components/svg/contacts/LinkedinSVG"
import WhatsAppSVG from "@/components/svg/contacts/WhatsAppSVG"
import styles from "./contacts.module.css"


export default function Contacts(){

  const fakeData = [
    {$svg: GitHubSVG, link: process.env.githubLink},
    {$svg: LinkedinSVG, link: process.env.linkedinLink},
    {$svg: WhatsAppSVG, link: process.env.whatsappLink},
  ]

  return(
    <div className={styles.container}>
      <ul className={styles.list}>{
        fakeData.map(({$svg, link}, index) => {
          return(
            <li key={index} className={styles.list_item}>
              <a className={styles.link} href={link}>
                <$svg className={styles.svgrepo_color} />
              </a>
            </li>
          )
        })
      }</ul>
    </div>
  )
}