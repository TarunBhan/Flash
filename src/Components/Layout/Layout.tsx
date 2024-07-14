import { onAuthStateChanged } from "firebase/auth";
import { FC, useContext, useEffect } from "react";
import { auth } from "../../firebase";
import { UserContex } from "../../context/UserContext";
import Home from "../Home/Home";
import Loader from "../Loader/Loader";

const Layout: FC = () => {
  const { isLoading } = useContext(UserContex);

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/auth";
      }
    });
    // Clean up the subscription
    return () => subscription();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: "grid",
        paddingInline: "10px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <Home />
        <div style={{ marginBottom: "100px" }} />
      </div>
    </div>
  );
};
export default Layout;
