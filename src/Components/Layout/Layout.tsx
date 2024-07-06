import { onAuthStateChanged } from "firebase/auth";
import { FC, useContext, useEffect } from "react";
import { auth } from "../../firebase";
import { UserContex } from "../../context/UserContext";
import Home from "../Home/Home";

const Layout: FC = () => {
  const { user: userData } = useContext(UserContex);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
      } else {
        window.location.href = "/auth";
      }
    });
    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {}, []);

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
