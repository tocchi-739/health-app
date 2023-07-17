import { DocumentData } from "firebase/firestore";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

interface props {
  firebaseData: DocumentData | undefined;
}

export const GraphArea = (props: props) => {
  const { firebaseData } = props;
  const sortedDescList = firebaseData?.sort(function (
    a: DocumentData,
    b: DocumentData
  ) {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  // グラフ化ここから
  const dateArray = sortedDescList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.date.substring(5).replace("-", "/")
  );
  const weightArray = sortedDescList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.weight
  );
  const fatPercentArray = sortedDescList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.fatPercent
  );
  const visceralFatLevelArray = sortedDescList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.visceralFatLevel
  );
  const bmiArray = sortedDescList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.bmi
  );
  const weightGraphData = {
    labels: dateArray,
    datasets: [
      {
        label: "体重",
        data: weightArray,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const visceralFatLevelGraphData = {
    labels: dateArray,
    datasets: [
      {
        label: "内臓脂肪レベル",
        data: visceralFatLevelArray,
        borderColor: "rgb(75, 100, 192)",
      },
    ],
  };
  const otherGraphData = {
    labels: dateArray,
    datasets: [
      {
        label: "体脂肪率",
        data: fatPercentArray,
        borderColor: "rgb(192, 192, 75)",
      },
      {
        label: "BMI",
        data: bmiArray,
        borderColor: "rgb(192, 75, 100)",
      },
    ],
  };

  return (
    <div className="md:w-6/12">
      <Line data={weightGraphData} />
      <Line data={visceralFatLevelGraphData} />
      <Line data={otherGraphData} />
    </div>
  );
};
