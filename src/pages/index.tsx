import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { InputArea } from "../components/InputArea";
import { DisPlayArea } from "../components/DisplayArea";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Health App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header>
          <h1>Health App!</h1>
        </header>
        <main className={styles.main}>
          <InputArea />
          <DisPlayArea />
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default Home;
