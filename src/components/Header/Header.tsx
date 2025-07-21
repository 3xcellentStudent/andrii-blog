'use client'

import { useEffect, useState } from "react"
import styles from "./header.module.css"
import Contacts from "./components/Contacts/Contacts"

export default function Header(){

  const menu = ["About Me", "Skills", "Experience",]

  const [activeTab, setActiveTab] = useState(0)

  function mouseScrollHandler(){
    const marginTop = 296;
    const {scrollY} = window

    const sections = document.querySelectorAll(".section_anchor");

    sections.forEach((section, index) => {
      if(scrollY >= (section as HTMLTableSectionElement).offsetTop - marginTop){
        setActiveTab(index);
      };
    })
  }

  useEffect(() => {
    window.onscroll = () => mouseScrollHandler();

    return () => window.removeEventListener("scroll", mouseScrollHandler)
  }, [])

  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.name}>Andrii Prokuda</h1>
        <h4 className={styles.role}>Full-Stack Engineer</h4>
        <p className={styles.short_desctription}>I build accessible, pixel-perfect digital experiences for the web</p>
        <nav className={styles.navigation}>
          <menu>
            {menu.map((text, index) => 
              <li key={index}>
                <a className={index === activeTab ? styles.tab_active : styles.tab}>{text}</a>
              </li>
            )}
          </menu>
        </nav>
      </div>
      <Contacts/>
    </header>
  );
}