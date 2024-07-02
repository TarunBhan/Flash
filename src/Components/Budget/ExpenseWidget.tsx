import React, { FC, useContext, useEffect, useState } from "react";
import baseTheme from "../Theme/baseTheme";
import { CustomButton, ProgressBar } from "./Budget.styles";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Budget } from "../../interface";
import { getDetailedExpensesInfo, getRandomNumber } from "../utils";
import { UserContex } from "../../context/UserContext";

const ExpenseWidget: FC<{ budgetData: Budget }> = ({ budgetData }) => {
  const { budgetName } = useParams();
  const { user, updateData } = useContext(UserContex);
  const navigate = useNavigate();
  const color = baseTheme.colors.blue;
  const { totalExpenses, amountLeft, widthPercentage } =
    getDetailedExpensesInfo(budgetData);
  console.log(">>>>>");
  const deleteBudget = async () => {
    try {
      const expenseDocRef = doc(
        db,
        `users/${user?.uid}/budgets`,
        `${budgetName || budgetData?.budgetName}`
      );
      await deleteDoc(expenseDocRef);
      updateData();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(widthPercentage, budgetData?.budgetName, ">>>>");
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "180px",
        borderRadius: "12px",
        maxWidth: "380px",
        boxShadow: "rgba(27,187,195,0.5) -1px -2px 19px 3px",
        padding: "10px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px dashed black",
          padding: "10px",
          width: "100%",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <text
              style={{
                fontSize: baseTheme.fontSizes[3],
                color,
              }}
            >
              Budget:{`${budgetName || budgetData?.budgetName}`}
            </text>
            <text style={{ fontSize: baseTheme.fontSizes[3], color }}>
              Total:₹{budgetData?.budgetValue} Budget
            </text>
          </div>
          <div
            style={{
              width: "100%",
              background: baseTheme.colors.blacks[3],
              height: "19px",
              borderRadius: "12px",
              marginTop: "12px",
            }}
          >
            <ProgressBar
              width={widthPercentage}
              color={color}
              animationName={`progressAnimate-${getRandomNumber()}`}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <text style={{ fontSize: baseTheme.fontSizes[3], color }}>
              Spent: ₹{totalExpenses}
            </text>
            <text style={{ fontSize: baseTheme.fontSizes[3], color }}>
              Remaining: ₹{amountLeft}
            </text>
          </div>
        </div>
        <Button
          onClick={deleteBudget}
          buttonText="Delete Budget"
          btnHeight="40px"
        ></Button>
      </div>
    </div>
  );
};
export default ExpenseWidget;
