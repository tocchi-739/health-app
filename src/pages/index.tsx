import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { InputArea } from "../components/InputArea";
import { DisPlayArea } from "../components/DisplayArea";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";

const db = getFirestore(app);
const Home: NextPage = () => {
  interface data {
    weight: string;
    fatPercent: string;
    visceralFatLevel: string;
    bmi: string;
  }

  const [record, setRecord] = useState({
    date: "",
    weight: "",
    fatPercent: "",
    visceralFatLevel: "",
    bmi: "",
  });

  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setDate(new Date());
  }, []);
  useEffect(() => {
    if (date) {
      const yyyy = date.getFullYear();
      const mm = ("0" + (date.getMonth() + 1)).slice(-2);
      const dd = ("0" + date.getDate()).slice(-2);
      const selectedDay = yyyy + "-" + mm + "-" + dd;
      setRecord((prev) => ({
        ...prev,
        date: selectedDay,
      }));
    }
  }, [date?.getDate()]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "visceralFatLevel" && e.target.value.length > 1) {
      alert("文字数オーバーです");
    } else if (
      e.target.name !== "visceralFatLevel" &&
      e.target.value.length > 4
    ) {
      alert("文字数オーバーです");
    } else {
      setRecord((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };
  const handleClick = async () => {
    // setData((data) => [...data, record]);
    const docRef = await addDoc(collection(db, "health-data"), {
      date: record.date,
      weight: record.weight,
      fatPercent: record.fatPercent,
      visceralFatLevel: record.visceralFatLevel,
      bmi: record.bmi,
    });
    setRecord({
      date: "",
      weight: "",
      fatPercent: "",
      visceralFatLevel: "",
      bmi: "",
    });
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Health App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Health App!</h1>
      </header>
      <main>
        <InputArea
          handleChange={handleChange}
          handleChangeDate={handleChangeDate}
          handleClick={handleClick}
          record={record}
        />
        <DisPlayArea />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
