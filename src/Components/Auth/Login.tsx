import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Input from "../Input/Input";
import Button from "../Button/Button";
import baseTheme from "../Theme/baseTheme";
import { EMAIL_REGEX, getErrorMessage, PASSWORD } from "../constant /constant";
import "./Form.css";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../context/UserContext";
import { auth } from "../../firebase";
import { useForm } from "react-hook-form";
import {
  FormWrapper,
  GuestButton,
  HeaderImage,
  ImageWrapper,
} from "./Login.styles";
import { toast } from "react-toastify";
import { Text } from "../../Styles/index.styles";
import UserIcon from "../../Assets/Svg/UserIcon";
const Login: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    email: "";
    password: "";
  }>();
  const { user } = useContext(UserContex);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const {
    formState: { errors, isValid },
    watch,
    register,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((data) => {
      setFormData((prev: any) => ({ ...prev, ...data }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleLogin = async () => {
    setLoading(true);
    //Add Firebase logic For User
    try {
      await signInWithEmailAndPassword(
        auth,
        formData?.email || "Guest@yopmail.com",
        formData?.password || "Rario@123"
      );
      setLoading(false);
      const users = auth.currentUser;
      toast.success(`Welcome back ${users?.displayName}!`);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formData?.email || "",
        formData?.password || ""
      );
      setLoading(false);
      const users = auth.currentUser;
      toast.success(`Welcome back ${users?.displayName}!`);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
    }
  };

  const name = isLoginForm ? "show-login" : "show-signup";
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          margin: "20px",
        }}
      >
        <GuestButton onClick={handleLogin}>
          <Text
            color={baseTheme.colors.white}
            fontFamily={baseTheme.fonts.secondary}
            fontSize={baseTheme.fontSizes[4]}
            style={{
              paddingRight: "5px",
            }}
          >
            Guest Login
          </Text>
          <UserIcon color={baseTheme.colors.white} />
        </GuestButton>
      </div>

      <div
        style={{
          flex: 1,
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          marginTop: "30px",
          display: "flex",
        }}
      >
        <FormWrapper
          style={{
            height: 450,
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.2) -1px -2px 19px 3px",
            borderRadius: "15px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            marginInline: "15px",
          }}
        >
          <div className="container">
            <HeaderImage
              style={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={require("../../Assets/Images/Expense_bg.jpg")}
                alt="Expense Image"
                width="100px"
                height="100px"
              />
            </HeaderImage>
            <div className={`form-container ${name}`}>
              <div className="form1">
                <Register
                  onClick={() => {
                    setIsLoginForm(false);
                  }}
                />
              </div>
              <div className="form1">
                <form
                  className="inputForm"
                  style={{
                    minWidth: "50%",
                    height: "100%",
                    borderRadius: "15px",
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <text
                    style={{
                      fontSize: baseTheme.fontSizes[6],
                      fontFamily: baseTheme.fonts.serif,
                      color: baseTheme.colors.black,
                    }}
                  >
                    Login
                  </text>

                  <Input
                    type="email"
                    headingText="Email"
                    autoFocus={true}
                    placeHolder={"email"}
                    props={register("email", {
                      required: "Please enter Email Adress",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Please Enter a Valid Email-id",
                      },
                    })}
                  />

                  <div
                    style={{
                      height: "10px",
                      width: "70%",
                      paddingBottom: "10px",
                    }}
                  >
                    {errors?.email && (
                      <text
                        style={{
                          fontSize: baseTheme.fontSizes[0],
                          fontFamily: baseTheme.fonts.secondary,
                          fontWeight: baseTheme.fontWeights[3],
                          color: baseTheme.colors.red,
                        }}
                      >
                        {errors?.email?.message as any}
                      </text>
                    )}
                  </div>

                  <Input
                    type="password"
                    headingText="Password"
                    placeHolder={"Password"}
                    props={register("password", {
                      required: "Please enter password",
                      pattern: {
                        value: PASSWORD,
                        message: "Please Enter a Valid password",
                      },
                    })}
                  />

                  <div
                    style={{
                      height: "10px",
                      width: "70%",
                      paddingBottom: "20px",
                    }}
                  >
                    {errors?.password?.message && (
                      <text
                        style={{
                          fontSize: baseTheme.fontSizes[0],
                          fontFamily: baseTheme.fonts.secondary,
                          fontWeight: baseTheme.fontWeights[3],
                          color: baseTheme.colors.red,
                        }}
                      >
                        {errors?.password?.message as any}
                      </text>
                    )}
                  </div>

                  <Button
                    buttonText="Login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                    disable={!isValid}
                    loading={loading}
                  />
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <text
                      style={{
                        fontSize: baseTheme.fontSizes[0],
                        fontFamily: baseTheme.fonts.secondary,
                        fontWeight: baseTheme.fontWeights[3],
                      }}
                    >
                      {isLoginForm
                        ? `Don't Have An Account?`
                        : "Already have a account?"}
                    </text>
                    <text
                      onClick={() => {
                        setIsLoginForm(true);
                      }}
                      style={{
                        fontSize: baseTheme.fontSizes[1],
                        fontFamily: baseTheme.fonts.secondary,
                        fontWeight: baseTheme.fontWeights[3],
                        color: baseTheme.colors.cyanBlue,
                        paddingLeft: "1px",
                        cursor: "pointer",
                      }}
                    >
                      {isLoginForm ? " Sign Up" : "Login"}
                    </text>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ImageWrapper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={require("../../Assets/Images/Expense_bg.jpg")}
              alt="Expense Image"
              width="90%"
              height="100%"
            />
          </ImageWrapper>
        </FormWrapper>
      </div>
    </>
  );
};
export default Login;
