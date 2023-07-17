import { getAuth, signOut } from "firebase/auth";
import { Button } from "./Button";

export const Logout = () => {
  const auth = getAuth();
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        alert("ログアウトに成功しました");
        // Sign-out successful.
      })
      .catch((error) => {
        alert("ログアウトに失敗しました");
        // An error happened.
      });
  };

  return <Button text="ログアウト" handleClick={handleClick}></Button>;
};
