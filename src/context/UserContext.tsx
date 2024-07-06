import { createContext } from "react";
import { Budget } from "../interface";

export const UserContex = createContext<{
  user?: any;
  isLoading: boolean;
  totalBudget: string[];
  userExpenseData: Budget[] | undefined;
  updateData: () => void;
}>({
  user: undefined,
  totalBudget: [],
  userExpenseData: undefined,
  isLoading: true,
  updateData: () => {},
});
