import { SetStateAction, useContext, useEffect, useState } from "react";
import DeleteIcon from "../../Assets/Svg/DeleteIcon";
import "./Table.css"; // Assuming you have a separate CSS file for styles
import { TableRow } from "./Table.styles";
import { UserContex } from "../../context/UserContext";
import { Budget } from "../../interface";
import { db } from "../../firebase";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { getErrorMessage } from "../constant /constant";
import { toast } from "react-toastify";

const Table = () => {
  const { userExpenseData, user, updateData } = useContext(UserContex);

  const [expensesData, setExpensesData] = useState<Budget[]>(
    userExpenseData || []
  );
  useEffect(() => {
    userExpenseData && setExpensesData(userExpenseData);
  }, [userExpenseData]);

  const deleteExpense = async (
    budgetIndex: number,
    expenseKey: number,
    budgetName: string
  ) => {
    const newData = [...expensesData];
    newData[budgetIndex].expenses = newData[budgetIndex].expenses.filter(
      (expense: { key: number }) => expense.key !== expenseKey
    );
    setExpensesData(newData);

    const expenseDocRef = doc(db, `users/${user?.uid}/budgets/${budgetName}`);

    try {
      await updateDoc(expenseDocRef, {
        expenses:
          newData[budgetIndex].expenses?.length === 0
            ? deleteField()
            : newData[budgetIndex].expenses,
      });
      updateData();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
    }
  };

  if (!expensesData || expensesData?.length === 0) {
    return <></>;
  }
  return (
    <div className="table-container">
      <h2>Recent Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody
          style={{
            gap: "10px",
            display: "block",
            width: "100%",
            overflowX: "hidden",
            overflow: "scroll",
            maxHeight: "400px",
          }}
        >
          {expensesData &&
            expensesData.flatMap(
              (budget: Budget, budgetIndex: number) =>
                budget?.expenses &&
                budget?.expenses?.map((row, index) => {
                  return (
                    <TableRow key={`Budget${budget.budgetName! + index}`}>
                      <td>{row.name}</td>
                      <td>{row.value}</td>
                      <td>{row.name}</td>
                      <td>
                        <div
                          style={{
                            gap: "5px",
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          {budget?.budgetValue}
                          <div
                            onClick={() => {
                              deleteExpense(
                                budgetIndex,
                                row.key,
                                budget?.budgetName || ""
                              );
                            }}
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </td>
                    </TableRow>
                  );
                })
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
