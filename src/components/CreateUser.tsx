import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "./Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export const CreateUser = () => {
  const [createUserData, setCreateUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const auth = getAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setCreateUserData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    createUserWithEmailAndPassword(
      auth,
      createUserData.email,
      createUserData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user) {
          const uid = user.uid;
          router.push(`/${uid}`);
        }
        toast.success("ユーザー登録に成功しました");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("ユーザー登録に失敗しました" + errorMessage);
      });
  };
  return (
    <>
      <div className="flex flex-col gap-4 my-8 md:flex-row md:flex-wrap">
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label htmlFor="email" className="md:w-auto">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="○○@○○.○○"
            onChange={handleChange}
            className="p-2 border border-cyan-900 rounded-md w-48"
          />
        </div>
        <div className="flex items-center justify-between text-cyan-900 md:flex-col md:items-start">
          <label htmlFor="password" className="md:w-auto">
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            className="p-2 border border-cyan-900 rounded-md w-48"
          />
        </div>
      </div>
      <Button text="登録" handleClick={handleClick}></Button>
    </>
  );
};
