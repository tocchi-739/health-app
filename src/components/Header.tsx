import { getAuth } from "firebase/auth";
import { Logout } from "./Logout";

export const Header = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email;
  return (
    <header className="flex pt-8 items-center justify-between">
      <h1 className="text-xl text-cyan-900 font-bold">Health App!</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <ul>
            <li>メールアドレス:{email}</li>
          </ul>
          <Logout />
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
