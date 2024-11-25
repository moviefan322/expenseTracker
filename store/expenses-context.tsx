import { createContext, useReducer, ReactNode } from "react";

import { ExpenseItem } from "../types/ExpenseItem";
import { expenses } from "../data/expenses";

interface ExpensesContextType {
  expenses: ExpenseItem[];
  addExpense: (expense: ExpenseItem) => void;
  setExpenses: (expenses: ExpenseItem[]) => void;
  deleteExpense: (id: string) => void;
  editExpense: (expense: ExpenseItem) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
  deleteExpense: () => {},
  editExpense: () => {},
});

type Action =
  | { type: "ADD"; payload: ExpenseItem }
  | { type: "DELETE"; payload: string }
  | { type: "EDIT"; payload: ExpenseItem }
  | { type: "SET"; payload: ExpenseItem[] };

type State = ExpenseItem[];

function expensesReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "DELETE":
      return state.filter(
        (expense) => expense.id !== action.payload
      );
    case "EDIT":
      const updatableExpenseIndex = state.findIndex(
        (expense: ExpenseItem) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: ReactNode }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, expenses);

  const addExpenseHandler = (expense: ExpenseItem) => {
    dispatch({ type: "ADD", payload: expense });
  };

  const setExpenses = (expenses: ExpenseItem[]) => {
    dispatch({ type: "SET", payload: expenses });
  }

  const deleteExpenseHandler = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const editExpenseHandler = (expense: ExpenseItem) => {
    dispatch({ type: "EDIT", payload: expense });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editExpense: editExpenseHandler,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
