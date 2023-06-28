import styles from "../../styles/Home.module.css";

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
      />
      <input
        name="fatPercent"
        type="number"
        placeholder="体脂肪率"
        onChange={handleChange}
        value={record.fatPercent}
      />
      <input
        name="visceralFatLevel"
        type="number"
        placeholder="内臓脂肪レベル"
        onChange={handleChange}
        value={record.visceralFatLevel}
      />
      <input
        name="bmi"
        type="number"
        placeholder="BMI"
        onChange={handleChange}
        value={record.bmi}
      />
      <button onClick={handleClick}>登録</button>
    </div>
  );
};
