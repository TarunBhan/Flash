import { Budget } from "../../interface";

export const getDetailedExpensesInfo = (budgets: Budget) => {
  let amountLeft = 0;
  let totalExpenses = 0;
  let widthPercentage: string = "";
  if (budgets?.expenses?.length > 0) {
    budgets.expenses.forEach((item) => {
      totalExpenses += item?.value;
    });
  }
  amountLeft = budgets?.budgetValue - totalExpenses;
  widthPercentage = `${Math.min(
    (totalExpenses / budgets?.budgetValue) * 100,
    100
  )}%`;
  return { totalExpenses, amountLeft, widthPercentage };
};

export const getRandomNumber = () => {
  return Math.floor(Math.random() * (999 - 100 + 1) + 100);
};
