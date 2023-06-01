import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Typography } from "@mui/material";

interface UserCardProps {
  user: {
    _id: number;
    Username: string;
    isAdmin: boolean;
  };
  getUsers: () => Promise<void>;
}

const Users: React.FC<UserCardProps> = ({
  user,
  getUsers,
}: UserCardProps) => {


  const handleEditAdmin = async () => {

    const response = await fetch(`/api/users/updatetoadmin/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      getUsers();
    }
  };


  return (
    <div
      className="user-card"
      style={{
        marginTop: "1rem",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        minWidth: "20rem",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center" }}
      >
        <AccountCircleIcon
          fontSize="large"
          style={{ color: "lightgray" }}
        />
        <Typography
          variant="h6"
          component="div"
        >
          {user.Username}
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleEditAdmin}
          >
            Admin
          </Button>
      </div>
    </div>
  );
};

export default Users;
