import type { NextPage } from "next";
import Head from "next/head";
import { InputArea } from "../components/InputArea";
import { DisPlayArea } from "../components/DisplayArea";
import { Toaster } from "react-hot-toast";
import { GraphArea } from "../components/GraphArea";
import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { CreateUser } from "../components/createUser";

const db = getFirestore(app);
const Home: NextPage = () => {
  const [displayChangeFlag, setDisplayChangeFlag] = useState(true);

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
  return (
    <>
      <Head>
        <title>Health App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-4 flex flex-col">
        <header>
          <h1 className="text-xl pt-8 text-cyan-900 font-bold">Health App!</h1>
        </header>
        <main className="flex-1">
          <CreateUser />
          <InputArea />
          <div className="border flex bg-cyan-900 text-white border-cyan-900 md:hidden">
            <button
              className={displayChangeFlag ? "" : " bg-white text-cyan-900"}
              onClick={() =>
                displayChangeFlag
                  ? displayChangeFlag
                  : setDisplayChangeFlag(!displayChangeFlag)
              }
            >
              一覧
            </button>
            <button
              className={displayChangeFlag ? "bg-white text-cyan-900" : ""}
              onClick={() =>
                displayChangeFlag
                  ? setDisplayChangeFlag(!displayChangeFlag)
                  : displayChangeFlag
              }
            >
              グラフ
            </button>
          </div>
          <div className="md:hidden">
            {displayChangeFlag ? (
              <DisPlayArea db={db} firebaseData={firebaseData} />
            ) : (
              <GraphArea firebaseData={firebaseData} />
            )}
          </div>
          <div className="hidden md:flex md:gap-20">
            <DisPlayArea db={db} firebaseData={firebaseData} />
            <GraphArea firebaseData={firebaseData} />
          </div>
        </main>
        <footer></footer>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
