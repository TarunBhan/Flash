import { useContext, useEffect, useState } from "react";
import BudgetWidget from "../Budget/BudgetWidget";
import ExpenseWidget from "../Budget/ExpenseWidget";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import AddExpense from "../Budget/AddExpense";
import { UserContex } from "../../context/UserContext";

const Home = () => {
  const [data, setData] = useState<any>([]);
  const { user, userExpenseData } = useContext(UserContex);
  console.log({ userExpenseData });
  const getBudgetData = async () => {
    try {
      let index = 0;
      let temp: any[] = [];

      const collectionRef = collection(db, `/users/${user?.uid}/budgets`);
      const querySnapshot = await getDocs(collectionRef);
      console.log(
        querySnapshot.docs?.forEach((item) => {
          temp.push({
            budgetName: item?.id,
            data: item?.data(),
          });
        })
      );
      setData(temp);
    } catch (e) {
      console.log("error>>>", e);
    }
  };

  useEffect(() => {
    getBudgetData();
  }, []);

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
      <AddExpense />
      <BudgetWidget />
      {userExpenseData &&
        userExpenseData?.map((item: any, index) => {
          return <ExpenseWidget budgetData={item} key={index} />;
        })}
    </div>
  );
};
export default Home;
