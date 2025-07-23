import ExperienceType from "@/types/experience.types"
import styles from "./card_item.module.css"
import LinkSquareSignSVG from "@/components/svg/LinkSquareSignSVG";

export default function CardItem({
  props: {description, position, title, workPeriod, link, ...props}, isActive
}: {props: ExperienceType, isActive: boolean}){

  return(
    <div className={`${styles.container} ${isActive && styles.container_active}`}>
      {
        link && <div className={styles.svg_container}>
          <LinkSquareSignSVG className={styles.svgrepo_color_stroke} />
        </div>
      }
      <div className={styles.wrapper}>
        <div className={styles.heading_block}>
          <div className={styles.info}>
            <h6 className={styles.title}>{title}</h6>
            <p className={styles.position}>{position}</p>
          </div>
          <div className={styles.period}>
            <span>{workPeriod.from}</span>
            <div className={styles.line}></div>
            <span>{workPeriod.to}</span>
          </div>
        </div>
        <div className={styles.content_block}>
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