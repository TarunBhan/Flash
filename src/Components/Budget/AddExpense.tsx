import { useContext, useEffect, useState } from "react";
import baseTheme from "../Theme/baseTheme";
import { UserContex } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { db } from "../../firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AddExpense = () => {
  const { user, totalBudget, updateData } = useContext(UserContex);

  const {
    register,
    formState: { isValid },
    reset,
    watch,
  } = useForm();
  const currDate = new Date();
  const timeStamp = `${currDate.getDate()}-${currDate.getMonth()}-${currDate.getFullYear()}`;

  const [isLoading, setIsLoading] = useState<boolean>();
  const [data, setData] = useState<{
    expenseName: string;
    expenseAmount: number;
    budgetName: string;
  }>();

  useEffect(() => {
    const subscription = watch((data) => {
      setData((prev: any) => ({ ...prev, ...data }));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleBudget = async () => {
    setIsLoading(true);

    const expenseDocRef = doc(
      db,
      `users/${user?.uid}/budgets/${data?.budgetName}`
    );

    try {
      await setDoc(
        expenseDocRef,
        {
          expenses: arrayUnion({
            name: data?.expenseName,
            value: Number(data?.expenseAmount),
            key: Math.floor(Math.random() * (999 - 100 + 1) + 100),
            timeStamp,
          }),
        },
        { merge: true }
      );
      setIsLoading(false);
      updateData();
      toast.success(
        `Expense:${data?.expenseName} added in ${data?.budgetName}`
      );
      reset();
    } catch (e) {
      setIsLoading(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "380px",
        height: "186px",
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
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
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
          <span>Add New Expense</span>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              height: "100%",
            }}
          >
            <div style={{ width: "50%" }}>
              <text
                style={{
                  fontFamily: baseTheme.fonts.secondary,
                  fontSize: baseTheme.fontSizes[0],
                  marginBottom: "10px",
                  marginTop: "5px",
                }}
              >
                Expense Name
              </text>
              <input
                type="text"
                required
                placeholder="Expense Name"
                style={{
                  width: "90%",
                  fontSize: baseTheme.fontSizes[0],
                  height: "20px",
                }}
                {...register("expenseName", {
                  required: "Please enter Your Expense Name",
                })}
              />
            </div>
            <div style={{ width: "50%" }}>
              <text
                style={{
                  fontFamily: baseTheme.fonts.secondary,
                  fontSize: baseTheme.fontSizes[0],
                  marginBottom: "10px",
                  marginTop: "5px",
                }}
              >
                Amount
              </text>
              <input
                type="number"
                required
                placeholder="₹250,₹20"
                style={{
                  width: "90%",
                  height: "20px",
                  fontSize: baseTheme.fontSizes[0],
                }}
                {...register("expenseAmount", {
                  required: "Please enter Expense Amount",
                })}
              />
            </div>
          </div>
          {/* DropDown */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              flexDirection: "column",
            }}
          >
            <text
              style={{
                fontFamily: baseTheme.fonts.secondary,
                fontSize: baseTheme.fontSizes[2],
                marginTop: "10px",
              }}
            >
              Select Budget
            </text>
            <select
              {...register("budgetName", { required: "select one option" })}
              style={{ width: "100%", height: "25px" }}
            >
              <option value="">--Please Select A Budget--</option>
              {totalBudget &&
                totalBudget?.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <Button
            buttonText="Add Expense"
            disable={!isValid}
            onClick={handleBudget}
            btnHeight="35px"
            loading={isLoading}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
export default AddExpense;
