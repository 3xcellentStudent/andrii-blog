import styles from "./card_item.module.css"

interface Props {
  workPeriod: {from: string, to: string}
  title: string
  position: string
  description: string
  className?: string
}

export default function CardItem({props: {description, position, title, workPeriod}}: {props: Props}){

  return(
    <div className={styles.container}>
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
        </div>
      </div>
    </div>
  );
}