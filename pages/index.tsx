import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  interface data {
    weight: string;
    fatPercent: string;
    visceralFatLevel: string;
    bmi: string;
  }

  const [data, setData] = useState<data[]>([]);
  const [record, setRecord] = useState({
    weight: "",
    fatPercent: "",
    visceralFatLevel: "",
    bmi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = () => {
    setData((data) => [...data, record]);
    setRecord({
      weight: "",
      fatPercent: "",
      visceralFatLevel: "",
      bmi: "",
    });
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
        <div>
          <input
            name="weight"
            type="text"
            placeholder="体重"
            autoFocus={true}
            onChange={handleChange}
            value={record.weight}
          />
          <input
            name="fatPercent"
            type="text"
            placeholder="体脂肪率"
            onChange={handleChange}
            value={record.fatPercent}
          />
          <input
            name="visceralFatLevel"
            type="text"
            placeholder="内臓脂肪レベル"
            onChange={handleChange}
            value={record.visceralFatLevel}
          />
          <input
            name="bmi"
            type="text"
            placeholder="BMI"
            onChange={handleChange}
            value={record.bmi}
          />
          <button onClick={handleClick}>登録</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>体重</th>
                <th>体脂肪率</th>
                <th>内臓脂肪レベル</th>
                <th>BMI</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => {
                return (
                  <tr key={index}>
                    <td>{d.weight}</td>
                    <td>{d.fatPercent}</td>
                    <td>{d.visceralFatLevel}</td>
                    <td>{d.bmi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
