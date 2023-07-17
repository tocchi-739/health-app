import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { toast } from "react-hot-toast";

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
      toast.error("文字数オーバーです");
      return;
    } else if (target.name !== "visceralFatLevel" && target.value.length > 4) {
      toast.error("文字数オーバーです");
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
      toast.error("未入力の箇所があります");
      return;
    }
    const regex = /\d{2}\.\d/;
    if (!regex.test(record.weight)) {
      toast.error("体重の入力に誤りがあります");
      return;
    } else if (!regex.test(record.fatPercent)) {
      toast.error("体脂肪率の入力に誤りがあります");
      return;
    } else if (!regex.test(record.bmi)) {
      toast.error("BMIの入力に誤りがあります");
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
    toast.success("登録しました!");
  };
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 my-8 md:flex-row md:flex-wrap">
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label className="md:w-auto">日付</label>
          <input
            name="date"
            type="date"
            onChange={handleChangeDate}
            value={record.date}
            className="p-2 bg-transparent border border-cyan-900 rounded-md w-48"
          />
        </div>
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label htmlFor="weight" className="md:w-auto">
            体重
          </label>
          <input
            ref={weightRef}
            id="weight"
            name="weight"
            type="text"
            inputMode="decimal"
            pattern="\d{2}\.\d"
            placeholder="○○.○"
            autoFocus={true}
            onChange={handleChange}
            value={record.weight}
            maxLength={4}
            className="p-2 border border-cyan-900 rounded-md w-48"
          />
        </div>
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label htmlFor="fatPercent" className="md:w-auto">
            体脂肪率
          </label>
          <input
            ref={fatPercentRef}
            id="fatPercent"
            name="fatPercent"
            type="text"
            inputMode="decimal"
            pattern="\d{2}\.\d"
            placeholder="○○.○"
            onChange={handleChange}
            value={record.fatPercent}
            maxLength={4}
            className="p-2 border border-cyan-900 rounded-md w-48"
          />
        </div>
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label htmlFor="visceralFatLevel" className="md:w-auto">
            内臓脂肪レベル
          </label>
          <input
            ref={visceralFatLevelRef}
            id="visceralFatLevel"
            name="visceralFatLevel"
            type="text"
            inputMode="decimal"
            pattern="\d"
            placeholder="○"
            onChange={handleChange}
            value={record.visceralFatLevel}
            maxLength={1}
            className="p-2 border border-cyan-900 rounded-md w-48"
          />
        </div>
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label htmlFor="bmi" className="md:w-auto">
            BMI
          </label>
          <input
            ref={bmiRef}
            id="bmi"
            name="bmi"
            type="text"
            inputMode="decimal"
            pattern="\d{2}\.\d"
            placeholder="○○.○"
            onChange={handleChange}
            value={record.bmi}
            maxLength={4}
            className="p-2 border border-cyan-900 rounded-md w-48"
          />
        </div>
      </div>
      <Button text="登録" handleClick={handleClick} />
    </div>
  );
};
