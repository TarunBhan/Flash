import { useContext, useEffect, useRef, useState } from "react";
import { UserContex } from "../../context/UserContext";
import { Text } from "../../Styles/index.styles";
import baseTheme from "../Theme/baseTheme";
import UserIcon from "../../Assets/Svg/UserIcon";
import SignoutIcon from "../../Assets/Svg/SignOutIcon";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { LinkComponent, LogoutContainer } from "./Header.styles";

const Header = () => {
  const { user, totalBudget } = useContext(UserContex);
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
  const iconRef = useRef<any>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
  };
  const handleOutsideClick = () => {
    setShowUserInfo(false);
  };
  useEffect(() => {
    const listener = (event: any) => {
      if (
        !iconRef.current ||
        iconRef.current.contains(event.target) ||
        !iconRef.current
      ) {
        return;
      } else {
        handleOutsideClick();
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#009b7b",
          display: "flex",
          justifyContent: "center",
          paddingBlock: "10px",
        }}
      >
        <Text
          fontSize={baseTheme.fontSizes[3]}
          fontWeight={baseTheme.fontWeights[4]}
          fontFamily={baseTheme.fonts.sansSerif}
          color={baseTheme.colors.white}
        >
          Craft Your Daily Expenses
        </Text>
      </div>
      {user && (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            padding: "20px",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
            position: "relative",
          }}
        >
          <img
            onClick={() => {
              navigate("/");
            }}
            src={require("../../Assets/Images/Expense_Logo.webp")}
            alt="Expense Image"
            width="50px"
            height="50px"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <LinkComponent
              to="/"
              color={baseTheme.colors.black}
              style={{
                textDecoration: "none",
                marginRight: "0px",
              }}
            >
              Home
            </LinkComponent>
            <LinkComponent
              to="/gemini"
              color={baseTheme.colors.black}
              style={{
                textDecoration: "none",
              }}
            >
              Ask Ai
            </LinkComponent>
            <LogoutContainer
              onClick={() => {
                setShowUserInfo(true);
              }}
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "100px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                border: `1px solid ${baseTheme.colors.black}`,
              }}
              ref={iconRef as any}
            >
              <UserIcon height="20px" width="20px" />

              {showUserInfo && (
                <div
                  style={{
                    display: "flex",
                    height: "95px",
                    width: "230px",
                    position: "absolute",
                    top: "40px",
                    right: "-5px",
                    background: "#daeded",
                    borderRadius: "12px",
                    boxShadow: "rgb(115 115 115 / 50%) -1px -2px 19px 3px",
                    flexDirection: "column",
                    padding: "12px",
                    zIndex: 999,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Text style={{ fontSize: baseTheme.fontSizes[3] }}>
                      Profile
                    </Text>
                  </div>

                  <div>
                    <div style={{ paddingTop: "5px" }}>
                      <Text
                        style={{ textTransform: "capitalize" }}
                        fontSize={baseTheme.fontSizes[2]}
                      >
                        Name:
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          paddingLeft: "4px",
                          opacity: 0.8,
                        }}
                        fontSize={baseTheme.fontSizes[1]}
                      >
                        {user?.firstName + " " + user?.lastName || ""}
                      </Text>
                    </div>
                    <div>
                      <Text style={{ textTransform: "capitalize" }}>
                        Email:
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          paddingLeft: "4px",
                          opacity: 0.8,
                        }}
                        fontSize={baseTheme.fontSizes[1]}
                      >
                        {user?.email}
                      </Text>
                    </div>
                    <div style={{ paddingTop: "5px" }}>
                      <Text style={{ textTransform: "capitalize" }}>
                        Total Budgets:
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          paddingLeft: "4px",
                          opacity: 0.8,
                        }}
                        fontSize={baseTheme.fontSizes[2]}
                      >
                        {totalBudget?.length}
                      </Text>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      top: "10px",
                      right: "13px",
                      cursor: "pointer",
                      padding: "5px",
                      border: "1px solid #b12a2a",
                      borderRadius: "100px",
                    }}
                    onClick={handleLogout}
                  >
                    <SignoutIcon />
                  </div>
                </div>
              )}
            </LogoutContainer>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
