import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import baseTheme from "../Theme/baseTheme";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { EMAIL_REGEX, PASSWORD } from "../constant /constant";
import { useForm } from "react-hook-form";

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
    try {
      //Add Firebase logic For User
      await createUserWithEmailAndPassword(
        auth,
        formData?.email || "",
        formData?.password || ""
      );

      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user?.uid), {
          email: formData?.email || "",
          firstName: formData?.firstName,
          lastName: formData?.lastName,
        });
      }
      console.log({ user });
    } catch (error) {
      console.log(error);
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
        headingText="FirstName"
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
      <Input
        type="text"
        headingText="LastName"
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
          paddingBottom: "15px",
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
          marginTop: "60px",
        }}
      >
        <text
          style={{
            fontSize: baseTheme.fontSizes[0],
            fontFamily: baseTheme.fonts.secondary,
            fontWeight: baseTheme.fontWeights[3],
          }}
        >
          {`Don't Have An Account?`}
        </text>
        <text
          onClick={() => onClick()}
          style={{
            fontSize: baseTheme.fontSizes[1],
            fontFamily: baseTheme.fonts.secondary,
            fontWeight: baseTheme.fontWeights[3],
            color: baseTheme.colors.cyanBlue,
            paddingLeft: "1px",
          }}
        >
          {" Sign Up"}
        </text>
      </div>
    </form>
  );
};

export default Register;
