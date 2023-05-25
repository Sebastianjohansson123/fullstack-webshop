import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  isAdmin: boolean;
}


 interface UserContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleLogin: (username: string, password: string) => void
 }





const UserContext = createContext<UserContextValue>(null as never)

export const useUserContext = () => useContext(UserContext)

export function UserProvider(props:PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {

  },[]
  );

  // username: string, password: string
  const handleLogin = async (username: string, password: string) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data)
      console.log(user)
      // localStorage.setItem('loggedInUsername', data.username);
      // localStorage.setItem('loggedInUserID', data._id);
      // localStorage.setItem('loggedInIsAdmin', data.isAdmin);
    }
  };


  return (
    <UserContext.Provider
    value={{
        user, 
        setUser,
        handleLogin,
    }}
    >
        {props.children}
    </UserContext.Provider>
  )
}