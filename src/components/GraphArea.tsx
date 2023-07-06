import {
  DocumentData,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const db = getFirestore(app);

export const GraphArea = () => {
  // const { data } = props;

  const [firebaseData, setFirebaseData] = useState<DocumentData>();

  useEffect(() => {
    // Firestoreのデータ監視を設定
    const unsubscribe = onSnapshot(
      collection(db, "health-data"),
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            date: data.date,
            weight: data.weight,
            fatPercent: data.fatPercent,
            visceralFatLevel: data.visceralFatLevel,
            bmi: data.bmi,
          };
        });
        setFirebaseData(dataList);
      }
    );

    // コンポーネントのアンマウント時にデータ監視を停止
    return () => unsubscribe();
  }, []);

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
    <div>
      <Line data={weightGraphData} />
      <Line data={visceralFatLevelGraphData} />
      <Line data={otherGraphData} />
    </div>
  );
};
