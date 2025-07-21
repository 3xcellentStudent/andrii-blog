import ExperienceType from "@/types/experience.types"
import styles from "./card_item.module.css"
import LinkSquareSignSVG from "@/components/svg/LinkSquareSignSVG";

export default function CardItem({props: {description, position, title, workPeriod, link, ...props}}: {props: ExperienceType}){

  return(
    <div className={`${styles.container} ${link && styles.container_pointer}`}>
      {
        link && <div className={styles.svg_container}>
          <LinkSquareSignSVG className={styles.svgrepo_color_stroke} />
        </div>
      }
      <div className={styles.wrapper}>
        <div className={styles.period}>
          <span>{workPeriod.from}</span>
          <div className={styles.line}></div>
          <span>{workPeriod.to}</span>
        </div>
        <div className={styles.info}>
          <h6 className={styles.title}>{title}</h6>
          <p className={styles.position}>{position}</p>
          <br/>
          <p className={styles.description}>{description}</p>

          {
            props?.list && 
            <ul className={styles.list}>
              {
                props.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          }
        </div>
      </div>
    </div>
  );
}