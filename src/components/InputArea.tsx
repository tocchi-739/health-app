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
    <div className={styles.inputArea}>
      <input
        name="date"
        type="date"
        onChange={handleChangeDate}
        value={record.date}
      />
      <input
        name="weight"
        type="number"
        placeholder="体重"
        autoFocus={true}
        onChange={handleChange}
        value={record.weight}
        maxLength={4}
      />
      <input
        name="fatPercent"
        type="number"
        placeholder="体脂肪率"
        onChange={handleChange}
        value={record.fatPercent}
        maxLength={4}
      />
      <input
        name="visceralFatLevel"
        type="number"
        placeholder="内臓脂肪レベル"
        onChange={handleChange}
        value={record.visceralFatLevel}
        maxLength={1}
      />
      <input
        name="bmi"
        type="number"
        placeholder="BMI"
        onChange={handleChange}
        value={record.bmi}
        maxLength={4}
      />
      <Button text="登録" handleClick={handleClick} />
    </div>
  );
};
