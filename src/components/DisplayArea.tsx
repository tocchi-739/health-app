import {
  DocumentData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { toast } from "react-hot-toast";

const db = getFirestore(app);

export const DisPlayArea = () => {
  // const { data } = props;
  const [firebaseData, setFirebaseData] = useState<DocumentData>();

  useEffect(() => {
    async function getData(db: Firestore) {
      const querySnapshot = await getDocs(collection(db, "health-data"));
      const dataList = querySnapshot.docs.map((doc) => {
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

    getData(db);
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
      window.location.reload();
    }
    await toast.success("削除しました!");
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
    </div>
  );
};
