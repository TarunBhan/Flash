import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReactNode } from "react";
import { UserContex } from "./UserContext";
import { auth, db } from "../firebase";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const useCustomUser = () => useContext(UserContex);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [totalBudget, setTotalBudgets] = useState<string[]>([]);
  const [userExpenseData, setUserExpenseData] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const getUserData = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "users", user?.uid || "");

          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser({ ...docSnap.data(), uid: user?.uid });
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    } catch (e) {
      setLoading(false);
    }
  };

  const getBudgetData = async () => {
    try {
      let temp: any[] = [];
      let tempBudgetArray: string[] = [];
      const collectionRef = collection(db, `/users/${user.uid}/budgets`);
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.docs?.forEach((item) => {
        tempBudgetArray.push(item?.id);

        temp.push({
          budgetName: item?.id,
          expenses: item?.data()?.expenses,
          budgetValue: item.data()?.budgetValue || 0,
        });
      });

      setTotalBudgets(tempBudgetArray);
      setUserExpenseData(temp);
    } catch (e) {}
  };

  const updateData = useCallback(() => {
    getBudgetData();
  }, [user]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    user && getBudgetData();
  }, [user]);

  const value = useMemo(
    () => ({ user, isLoading, totalBudget, userExpenseData, updateData }),
    [isLoading, user, totalBudget, userExpenseData, updateData]
  );

  return <UserContex.Provider value={value}>{children}</UserContex.Provider>;
};

export default UserProvider;
