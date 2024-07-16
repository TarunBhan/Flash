export interface Expense {
  key: number;
  value: number;
  name: string;
  timeStamp: string;
}

export interface Budget {
  expenses: Expense[];
  budgetValue: number;
  budgetName?: string;
}
