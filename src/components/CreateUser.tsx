import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "./Button";
import { useState } from "react";

export const CreateUser = () => {
  const [createUserData, setCreateUserData] = useState({
    email: "",
    password: "",
  });

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
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setCreateUserData({
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
      <Button text="登録" handleClick={handleClick}></Button>
    </>
  );
};
