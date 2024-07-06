import { useNavigate, useParams } from "react-router-dom";
import ExpenseWidget from "../Budget/ExpenseWidget";
import { FC, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContex } from "../../context/UserContext";
import { Budget } from "../../interface";

const ExpenseDetailScreen: FC = () => {
  const { budgetName } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContex);
  const [budgetData, setBudgetData] = useState<Budget | undefined>();

  const getSingleBudgetData = async () => {
    try {
      const docRef = doc(db, `users/${user?.uid}/budgets/${budgetName}`);
      console.log({ docRef });
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBudgetData(docSnap.data() as Budget);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    user && getSingleBudgetData();
  }, [user]);

  if (!budgetName) {
    navigate("/");
    return <></>;
  }

  console.log(">>>", budgetData);
  return (
    <div
      style={{
        display: "flex",
        zIndex: 9999,
      }}
    >
      {budgetData && <ExpenseWidget budgetData={budgetData} />}
    </div>
  );
};

export default ExpenseDetailScreen;
