interface props {
  data: {
    weight: string;
    fatPercent: string;
    visceralFatLevel: string;
    bmi: string;
  }[];
}

export const DisPlayArea = (props: props) => {
  const { data } = props;
  return (
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
  );
};
