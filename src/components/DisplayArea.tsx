import {
  DocumentData,
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
const db = getFirestore(app);

export const DisPlayArea = () => {
  // const { data } = props;
  const [firebaseData, setFirebaseData] = useState<DocumentData>();

  useEffect(() => {
    async function getData(db: Firestore) {
      const querySnapshot = await getDocs(collection(db, "health-data"));
      const dataList = querySnapshot.docs.map((doc) => doc.data());
      setFirebaseData(dataList);
    }
    getData(db);
    console.log(firebaseData);
  }, [1000]);

  return (
    <div className={styles.displayArea}>
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
          {firebaseData?.map((d: DocumentData, index: string) => {
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
