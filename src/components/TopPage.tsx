import { useState } from "react";
import { Login } from "./Login";
import { CreateUser } from "./CreateUser";

export const TopPage = () => {
  const [displayChangeFlag, setDisplayChangeFlag] = useState(true);
  return (
    <>
      <div className="border flex bg-cyan-900 text-white border-cyan-900 mt-8">
        <button
          className={displayChangeFlag ? "" : " bg-white text-cyan-900"}
          onClick={() =>
            displayChangeFlag
              ? displayChangeFlag
              : setDisplayChangeFlag(!displayChangeFlag)
          }
        >
          ログイン
        </button>
        <button
          className={displayChangeFlag ? "bg-white text-cyan-900" : ""}
          onClick={() =>
            displayChangeFlag
              ? setDisplayChangeFlag(!displayChangeFlag)
              : displayChangeFlag
          }
        >
          新規登録
        </button>
      </div>
      <div>{displayChangeFlag ? <Login /> : <CreateUser />}</div>
    </>
  );
};
