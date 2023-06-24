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
  );
};
