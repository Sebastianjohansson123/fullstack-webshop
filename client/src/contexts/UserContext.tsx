import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  username: string;
  isAdmin: boolean;
}

interface UserContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleLogin: (username: string, password: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextValue>(null as never);

export const useUserContext = () => useContext(UserContext);

export function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchUser() {
    try {
      const response = await fetch('/api/users/self', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Hämta user från API'et och spara i state
    fetchUser();
  }, []);

  // username: string, password: string
  const handleLogin = async (username: string, password: string) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data);
      console.log(user);
      setUser(data);
      console.log(user);
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
        isLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
