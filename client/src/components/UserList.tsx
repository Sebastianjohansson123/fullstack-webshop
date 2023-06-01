import { useEffect, useState } from 'react';
import Users from './Users';

export interface User {
  _id: number;
  username: string;
  isAdmin: boolean;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();

    if (response.ok) {
      setUsers(data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '6rem',
        }}
      >
        {users.map(user => (
          <Users
            key={user._id}
            user={{
              _id: user._id,
              Username: user.username,
              isAdmin: user.isAdmin,
            }}
            getUsers={getUsers}
          />
        ))}
      </div>
    </>
  );
}

export default UserList;
