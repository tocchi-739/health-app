import { getAuth } from "firebase/auth";
import { Logout } from "./Logout";
import { useState } from "react";

export const Header = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email;
  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const handleClick = () => {
    setHamburgerToggle(!hamburgerToggle);
  };

  return (
    <header className="flex pt-8 justify-between items-center">
      <h1 className="text-xl text-cyan-900 font-bold">Health App!</h1>
      {user ? (
        <div
          onClick={handleClick}
          className="z-50 md:hidden p-2 bg-cyan-900 text-white rounded hover:bg-white hover:border hover:border-cyan-900 hover:text-cyan-900 duration-200"
        >
          menu
        </div>
      ) : (
        ""
      )}
      {hamburgerToggle ? (
        <div
          className="bg-gray-300 h-full w-screen fixed top-0 left-0 grid place-items-center"
          onClick={handleClick}
        >
          <div className="h-4/6 w-9/12 gap-3 flex flex-col">
            <ul className="text-cyan-900">
              <li>{email}</li>
            </ul>
            <Logout />
          </div>
        </div>
      ) : (
        <>
          {user ? (
            <div className="items-center gap-4 mt-4 hidden md:flex">
              <ul className="text-cyan-900">
                <li>{email}</li>
              </ul>
              <Logout />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </header>
  );
};
