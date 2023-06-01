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

export interface adress {
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
  adress: adress;
  Sent: boolean;
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
  updateOrderbyId: (id: string) => void;
}

const UserContext = createContext<UserContextValue>(null as any);

export const useUserContext = () => useContext(UserContext);

export function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);

  async function getOrders() {
    const response = await fetch('/api/orders');
    const data = await response.json();
    setOrders(data);
  }

  async function updateOrderbyId(id: string) {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        // body: JSON.stringify({ sent: true }),
        headers: { 'Content-type': 'application/json' },
      });
      if (response.ok) {
        getOrders();
      }
    } catch (error) {
      console.error(error);
    }
  }
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
    try {
      const response = await fetch(`/api/orders/user/${user?._id}`);
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

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
        updateOrderbyId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
