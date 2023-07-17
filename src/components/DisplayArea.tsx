import { DocumentData, Firestore, deleteDoc, doc } from "firebase/firestore";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";

interface props {
  db: Firestore;
  firebaseData: DocumentData | undefined;
}

export const DisPlayArea = (props: props) => {
  const { db, firebaseData } = props;

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;
  const sortedAscList = firebaseData?.sort(function (
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
    if (uid) {
      const confirm: boolean = window.confirm("本当に削除しますか？");
      if (confirm) {
        await deleteDoc(doc(db, "health-data", uid, "daily", e));
      }
      await toast.success("削除しました!");
    }
  };

  return (
    <div>
      <table className="border border-white text-cyan-900 mx-auto">
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
          {sortedAscList?.slice(0, 14).map((d: DocumentData, index: string) => {
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
