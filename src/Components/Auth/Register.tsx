import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import baseTheme from "../Theme/baseTheme";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { EMAIL_REGEX, getErrorMessage, PASSWORD } from "../constant /constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register: FC<{ onClick: () => void }> = ({ onClick }) => {
  const [formData, setFormData] = useState<{
    email: "";
    password: "";
    firstName: "";
    lastName: "";
  }>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors, isValid },
    watch,
    register,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = watch((data) => {
      setFormData((prev: any) => ({ ...prev, ...data }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRegister = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      //Add Firebase logic For User
      await createUserWithEmailAndPassword(
        auth,
        formData?.email || "",
        formData?.password || ""
      );

      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: formData?.firstName || "",
        });
        await setDoc(doc(db, "users", user?.uid), {
          email: formData?.email || "",
          firstName: formData?.firstName,
          lastName: formData?.lastName,
        });
      }
      setLoading(false);
      navigate("/");
      toast.success("SignUp SuccessFull!!");
    } catch (error: any) {
      setLoading(false);
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
    }
  };

  return (
    <form
      style={{
        minWidth: "50%",
        backgroundColor: "white",
        height: "100%",
        borderRadius: "15px",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        SignUp
      </text>

      <Input
        type="text"
        headingText="First Name"
        autoFocus={true}
        placeHolder={"FirstName"}
        props={register("firstName", {
          required: "Please enter your FirstName",
          max: {
            value: 40,
            message: "Please Write Your Correct Name",
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
        {errors?.firstName && (
          <text
            style={{
              fontSize: baseTheme.fontSizes[0],
              fontFamily: baseTheme.fonts.secondary,
              fontWeight: baseTheme.fontWeights[3],
              color: baseTheme.colors.red,
            }}
          >
            {errors?.firstName?.message as any}
          </text>
        )}
      </div>
      <Input
        type="text"
        headingText="Last Name"
        autoFocus={true}
        placeHolder={"Last Name"}
        props={register("lastName", {
          required: "Please enter your LastName",
          max: {
            value: 40,
            message: "Please Write Your Correct Name",
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
        {errors?.lastName && (
          <text
            style={{
              fontSize: baseTheme.fontSizes[0],
              fontFamily: baseTheme.fonts.secondary,
              fontWeight: baseTheme.fontWeights[3],
              color: baseTheme.colors.red,
            }}
          >
            {errors?.lastName?.message as any}
          </text>
        )}
      </div>
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
        buttonText="Register"
        onClick={(e) => {
          e.preventDefault();
          handleRegister(e);
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
          {`Already have a account?`}
        </text>
        <text
          onClick={() => onClick()}
          style={{
            fontSize: baseTheme.fontSizes[1],
            fontFamily: baseTheme.fonts.secondary,
            fontWeight: baseTheme.fontWeights[3],
            color: baseTheme.colors.cyanBlue,
            paddingLeft: "1px",
            cursor: "pointer",
          }}
        >
          {" Login Up"}
        </text>
      </div>
    </form>
  );
};

export default Register;
