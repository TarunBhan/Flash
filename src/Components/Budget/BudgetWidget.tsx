import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import baseTheme from "../Theme/baseTheme";
import { doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContex } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { getRandomNumber } from "../utils";
import { toast } from "react-toastify";

const BudgetWidget = () => {
  const { user, totalBudget, updateData } = useContext(UserContex);
  const {
    register,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [data, setData] = useState<{
    budgetName: string;
    budgetAmount: number;
  }>({
    budgetName: "",
    budgetAmount: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = watch((data) => {
      setData((prev: any) => ({ ...prev, ...data }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const addBudget = async () => {
    setLoading(true);
    if (totalBudget.find((item) => item === data?.budgetName)) {
      setLoading(false);
      toast.error(`${data?.budgetName} Already Exsist!`);
      return;
    }
    const expenseDocRef = doc(
      db,
      `users/${user?.uid}/budgets/${data?.budgetName}`
    );

    try {
      await setDoc(expenseDocRef, {
        budgetValue: Number(data?.budgetAmount),
      });
      setLoading(false);
      updateData();
      toast.success(`${data?.budgetName} Budget Created!`);
      reset();
      // const dataRef = await addDoc(
      //   collection(db, "users/BE4VYqOT0dbyWbtSrZZXdsNH2CZ2/Expenses"),
      //   { data: { budgets: "Hey There", expense: [{ kurkire: 10 }] } }
      // );
    } catch (e) {
      toast.error(`${e}`);
    }
  };
  const handleBudget = async () => {
    const expenseDocRef = doc(
      db,
      `users/BE4VYqOT0dbyWbtSrZZXdsNH2CZ2/budgets/${data?.budgetName}`
    );
    try {
      await setDoc(
        expenseDocRef,
        {
          expenses: arrayUnion({
            name: "Indian Game is",
            valie: 10,
            key: getRandomNumber(),
          }),
        },
        { merge: true }
      );

      // const dataRef = await addDoc(
      //   collection(db, "users/BE4VYqOT0dbyWbtSrZZXdsNH2CZ2/Expenses"),
      //   { data: { budgets: "Hey There", expense: [{ kurkire: 10 }] } }
      // );
    } catch (e) {}
  };

  //Delete Budget

  //Delete Expense

  //GetBudget

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "380px",
        height: "185px",
        borderRadius: "10px",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "white",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.2) -1px -2px 19px 3px",
      }}
    >
      <div
        style={{
          border: "1px dashed black",
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          minWidth: "300px",
          borderRadius: "10px",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <text
            style={{
              fontFamily: baseTheme.fonts.secondary,
              fontSize: baseTheme.fontSizes[2],
            }}
          >
            Create Budget
          </text>
          <text
            style={{
              fontFamily: baseTheme.fonts.secondary,
              fontSize: baseTheme.fontSizes[0],
              marginBottom: "10px",
              marginTop: "5px",
            }}
          >
            Budget Name
          </text>
          <input
            type="text"
            autoFocus
            placeholder="Budget Name"
            style={{
              width: "80%",
              fontSize: baseTheme.fontSizes[0],
              height: "20px",
            }}
            {...register("budgetName", {
              required: "Please enter Your Budget Name",
            })}
          />
          <div
            style={{
              width: "70%",
              height: "10px",
              display: "flex",
            }}
          >
            {errors?.budgetName && (
              <text
                style={{
                  fontSize: "8px",
                  fontFamily: baseTheme.fonts.secondary,
                  fontWeight: baseTheme.fontWeights[3],
                  color: baseTheme.colors.red,
                  paddingTop: "2px",
                }}
              >
                {errors?.budgetName?.message as any}
              </text>
            )}
          </div>

          <text
            style={{
              fontFamily: baseTheme.fonts.secondary,
              fontSize: baseTheme.fontSizes[0],
            }}
          >
            Amount
          </text>
          <input
            type="number"
            required
            placeholder="₹250,₹20"
            style={{
              width: "80%",
              height: "20px",
              fontSize: baseTheme.fontSizes[0],
            }}
            {...register("budgetAmount", {
              required: "Please enter BudgetAmount",
            })}
          />
          <div
            style={{
              width: "70%",
              height: "10px",
              display: "flex",
              marginBottom: "5px",
            }}
          >
            {errors?.budgetAmount && (
              <text
                style={{
                  fontSize: "8px",
                  fontFamily: baseTheme.fonts.secondary,
                  fontWeight: baseTheme.fontWeights[3],
                  color: baseTheme.colors.red,
                  paddingTop: "2px",
                }}
              >
                {errors?.budgetAmount?.message as any}
              </text>
            )}
          </div>

          <Button
            buttonText="Create Budget"
            disable={!isValid}
            onClick={addBudget}
            btnHeight="35px"
            loading={loading}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default BudgetWidget;
