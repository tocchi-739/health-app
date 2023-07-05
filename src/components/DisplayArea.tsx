import {
  DocumentData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { toast } from "react-hot-toast";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const db = getFirestore(app);

export const DisPlayArea = () => {
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

  const sortedList = firebaseData?.sort(function (
    a: DocumentData,
    b: DocumentData
  ) {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  const onClickDelete = async (e: string) => {
    const confirm: boolean = window.confirm("本当に削除しますか？");
    if (confirm) {
      await deleteDoc(doc(db, "health-data", e));
    }
    await toast.success("削除しました!");
  };

  // グラフ化ここから
  const dateArray = sortedList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.date
  );
  console.log(dateArray);
  const weightArray = sortedList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.weight
  );
  const fatPercentArray = sortedList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.fatPercent
  );
  const visceralFatLevelArray = sortedList?.map(
    (obj: {
      id: string;
      date: string;
      weight: string;
      fatPercent: string;
      visceralFatLevel: string;
      bmi: string;
    }) => obj.visceralFatLevel
  );
  const bmiArray = sortedList?.map(
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
    <div className={styles.displayArea}>
      <table className="border border-white text-cyan-900">
        <thead className="bg-cyan-900 text-white">
          <tr>
            <th>日付</th>
            <th>体重</th>
            <th>体脂肪率</th>
            <th>内臓脂肪レベル</th>
            <th>BMI</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedList?.map((d: DocumentData, index: string) => {
            return (
              <tr key={index}>
                <td>{d.date.substring(5).replace("-", "/")}</td>
                <td>{d.weight}</td>
                <td>{d.fatPercent}</td>
                <td>{d.visceralFatLevel}</td>
                <td>{d.bmi}</td>
                <td>
                  <button
                    onClick={() => onClickDelete(d.id)}
                    className="text-white"
                  >
                    <IconContext.Provider
                      value={{ size: "20px", color: "#ef4444" }}
                    >
                      <RiDeleteBinLine />
                    </IconContext.Provider>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Line data={weightGraphData} />
      <Line data={visceralFatLevelGraphData} />
      <Line data={otherGraphData} />
    </div>
  );
};
