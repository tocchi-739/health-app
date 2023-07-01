import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import { Button } from "./Button";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";

const db = getFirestore(app);

export const InputArea = () => {
  const [record, setRecord] = useState({
    date: "",
    weight: "",
    fatPercent: "",
    visceralFatLevel: "",
    bmi: "",
  });

  const [date, setDate] = useState<Date>();
  // 当日の日付を初期設定
  useEffect(() => {
    setDate(new Date());
  }, []);
  // データ登録用日付の変換処理
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

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  const weightRef = useRef<HTMLInputElement>(null);
  const fatPercentRef = useRef<HTMLInputElement>(null);
  const visceralFatLevelRef = useRef<HTMLInputElement>(null);
  const bmiRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const maxLength = target.getAttribute("maxLength");
    const currentLength = target.value.length;
    // 規定の文字数に達した場合に次のinputエリアにフォーカスを移動
    if (currentLength === Number(maxLength)) {
      switch (target.name) {
        case "weight":
          if (fatPercentRef.current) {
            fatPercentRef.current.focus();
          }
          break;
        case "fatPercent":
          if (visceralFatLevelRef.current) {
            visceralFatLevelRef.current.focus();
          }
          break;
        case "visceralFatLevel":
          if (bmiRef.current) {
            bmiRef.current.focus();
          }
          break;
        default:
          break;
      }
    }
    // 文字数がオーバーしている場合にアラート
    // 最大文字数が入力されいてるinputエリアを再度選択して、入力することを防ぐためのもの
    if (target.name === "visceralFatLevel" && target.value.length > 1) {
      alert("文字数オーバーです");
      return;
    } else if (target.name !== "visceralFatLevel" && target.value.length > 4) {
      alert("文字数オーバーです");
      return;
    } else {
      setRecord((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  // データの登録処理
  const handleClick = async () => {
    if (
      record.date === "" ||
      record.weight === "" ||
      record.fatPercent === "" ||
      record.visceralFatLevel === "" ||
      record.bmi === ""
    ) {
      alert("未入力の箇所があります");
      return;
    }
    const regex = /\d{2}\.\d/;
    if (!regex.test(record.weight)) {
      alert("体重の入力に誤りがあります");
      return;
    } else if (!regex.test(record.fatPercent)) {
      alert("体脂肪率の入力に誤りがあります");
      return;
    } else if (!regex.test(record.bmi)) {
      alert("BMIの入力に誤りがあります");
      return;
    }
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
    <>
      <div className={styles.inputArea}>
        <div className={styles.inputItemWrapper}>
          <label>日付</label>
          <input
            name="date"
            type="date"
            onChange={handleChangeDate}
            value={record.date}
          />
        </div>
        <div className={styles.inputItemWrapper}>
          <label htmlFor="weight">体重</label>
          <input
            ref={weightRef}
            id="weight"
            name="weight"
            type="text"
            inputMode="numeric"
            pattern="\d{2}\.\d"
            placeholder="○○,○"
            autoFocus={true}
            onChange={handleChange}
            value={record.weight}
            maxLength={4}
          />
        </div>
        <div className={styles.inputItemWrapper}>
          <label htmlFor="fatPercent">体脂肪率</label>
          <input
            ref={fatPercentRef}
            id="fatPercent"
            name="fatPercent"
            type="text"
            inputMode="numeric"
            pattern="\d{2}\.\d"
            placeholder="○○,○"
            onChange={handleChange}
            value={record.fatPercent}
            maxLength={4}
          />
        </div>
        <div className={styles.inputItemWrapper}>
          <label htmlFor="visceralFatLevel">内臓脂肪レベル</label>
          <input
            ref={visceralFatLevelRef}
            id="visceralFatLevel"
            name="visceralFatLevel"
            type="text"
            inputMode="numeric"
            pattern="\d"
            placeholder="○"
            onChange={handleChange}
            value={record.visceralFatLevel}
            maxLength={1}
          />
        </div>
        <div className={styles.inputItemWrapper}>
          <label htmlFor="bmi">BMI</label>
          <input
            ref={bmiRef}
            id="bmi"
            name="bmi"
            type="text"
            inputMode="numeric"
            pattern="\d{2}\.\d"
            placeholder="○○,○"
            onChange={handleChange}
            value={record.bmi}
            maxLength={4}
          />
        </div>
      </div>
      <Button text="登録" handleClick={handleClick} />
    </>
  );
};
