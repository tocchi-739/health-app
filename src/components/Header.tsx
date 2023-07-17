import { getAuth } from "firebase/auth";
import { Logout } from "./Logout";

export const Header = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email;
  return (
    <header className="flex py-8 items-center md:justify-between flex-col md:flex-row">
      <h1 className="text-xl text-cyan-900 font-bold">Health App!</h1>
      {user ? (
        <div className="flex items-center gap-4 mt-4">
          <ul>
            <li>{email}</li>
          </ul>
          <Logout />
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
