import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "./Button";
import { useState } from "react";

export const Login = () => {
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();
  console.log(auth.currentUser?.uid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setLoginUserData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    signInWithEmailAndPassword(
      auth,
      loginUserData.email,
      loginUserData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("ログインに成功しました！");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    setLoginUserData({
      email: "",
      password: "",
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
      <Button text="ログイン" handleClick={handleClick}></Button>
    </>
  );
};
