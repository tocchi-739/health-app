import styles from "../../styles/Home.module.css";
import { Button } from "./Button";

interface props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  record: {
    date: string;
    weight: string;
    fatPercent: string;
    visceralFatLevel: string;
    bmi: string;
  };
}
export const InputArea = (props: props) => {
  const { handleChange, handleChangeDate, handleClick, record } = props;

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
            id="weight"
            name="weight"
            type="number"
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
            id="fatPercent"
            name="fatPercent"
            type="number"
            placeholder="○○,○"
            onChange={handleChange}
            value={record.fatPercent}
            maxLength={4}
          />
        </div>
        <div className={styles.inputItemWrapper}>
          <label htmlFor="visceralFatLevel">内臓脂肪レベル</label>
          <input
            id="visceralFatLevel"
            name="visceralFatLevel"
            type="number"
            placeholder="○"
            onChange={handleChange}
            value={record.visceralFatLevel}
            maxLength={1}
          />
        </div>
        <div className={styles.inputItemWrapper}>
          <label htmlFor="bmi">BMI</label>
          <input
            id="bmi"
            name="bmi"
            type="number"
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
