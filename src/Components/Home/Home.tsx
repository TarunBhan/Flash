import { useContext } from "react";
import BudgetWidget from "../Budget/BudgetWidget";
import ExpenseWidget from "../Budget/ExpenseWidget";
import AddExpense from "../Budget/AddExpense";
import { UserContex } from "../../context/UserContext";

const Home = () => {
  const { userExpenseData, totalBudget } = useContext(UserContex);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "30px",
        justifyContent: "center",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <BudgetWidget />
      {totalBudget?.length >= 1 && <AddExpense />}
      {userExpenseData &&
        userExpenseData?.map((item: any, index) => {
          return <ExpenseWidget budgetData={item} key={index} />;
        })}
    </div>
  );
};
export default Home;
