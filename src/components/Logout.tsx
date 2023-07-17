import { getAuth, signOut } from "firebase/auth";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export const Logout = () => {
  const router = useRouter();
  const auth = getAuth();
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        toast.success("ログアウトに成功しました");
        router.replace(`/`);
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error("ログアウトに失敗しました");
        // An error happened.
      });
  };

  return <Button text="ログアウト" handleClick={handleClick}></Button>;
};
