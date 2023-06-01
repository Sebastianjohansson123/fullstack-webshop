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
  _id: number;
}

export interface Adress {
  fullName: string;
  address: string;
  zipCode: number;
  city: string;
  email: string;
  phoneNumber: number;
  _id: number;
}

export interface Order {
  _id: number;
  user: number;
  orderRows: [];
  totalPrice: number;
  adress: Adress;
  sent: boolean;
}

interface UserContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
  isLoading: boolean;
  getOrders: () => void;
  getOrderForUser: () => void;
  orders: Order[];
}

const UserContext = createContext<UserContextValue>(null as any);

export const useUserContext = () => useContext(UserContext);

export async function getOrders() {
  const response = await fetch('/api/orders');
  const data = await response.json();
  return data;
}

export function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/users/self');
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    // Hämta user från API'et och spara i state
    fetchUser();
  }, []);

  const getOrderForUser = async () => {
    const response = await fetch(`/api/orders/${user?._id}`);
    const data = await response.json();
    return data;
  };

  // export async function getOrderForUser() {
  //   const response = await fetch(`/api/orders/${user?._id}`);
  //   const data = await response.json();
  //   return data;
  // }

  const handleLogin = async (username: string, password: string) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
    });

    if (response.ok) {
      setUser(null);
      console.log('Du är nu utloggad');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        isLoading,
        getOrders,
        getOrderForUser,
        orders,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
