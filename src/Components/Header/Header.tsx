import { useContext } from "react";
import { UserContex } from "../../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContex);
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
      }}
    >
      <h1>Welcome Back </h1>
      <h1
        style={{
          color: "#1bbbc3",
          textTransform: "capitalize",
          paddingLeft: "2px",
        }}
      >
        {user?.firstName}
      </h1>
    </div>
  );
};
export default Header;
