import { useContext } from "react";
import BudgetWidget from "../Budget/BudgetWidget";
import ExpenseWidget from "../Budget/ExpenseWidget";
import AddExpense from "../Budget/AddExpense";
import { UserContex } from "../../context/UserContext";
import Table from "../Table/Table";
import { Text } from "../../Styles/index.styles";
import baseTheme from "../Theme/baseTheme";

const Home = () => {
  const { userExpenseData, totalBudget } = useContext(UserContex);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      <Table />
    </div>
  );
};
export default Home;
