export interface Expense {
  key: number;
  value: number;
  name: string;
}

export interface Budget {
  expenses: Expense[];
  budgetValue: number;
  budgetName?: string;
}
