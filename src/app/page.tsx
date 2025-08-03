import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import GradientBg from "@/components/common/GradientBg/GradientBg";
import Writings from "@/components/Writings/Writings";

export default function Home(){

  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <div>
            <About/>
          </div>
          <div>
            <Skills/>
          </div>
          <div>
            <Experience/>
          </div>
          <div>
            {/* <Writings/> */}
          </div>
        </main>
      </div>
      <GradientBg/>
    </>
  );
}
