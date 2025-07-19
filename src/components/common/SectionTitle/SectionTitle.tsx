import styles from "./section_title.module.css"

interface Props {
  text: string
  className?: string
}

export default function SectionTitle({text, className}: Props){

  return <h4 className={`${styles.title} ${className}`}>{text}</h4>
}