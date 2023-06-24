interface props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  record: {
    weight: string;
    fatPercent: string;
    visceralFatLevel: string;
    bmi: string;
  };
}
export const InputArea = (props: props) => {
  const { handleChange, handleClick, record } = props;
  return (
    <div>
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
