import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeExpense } from "../util/http";
import { ExpenseItem } from "../types/ExpenseItem";

interface AddExpensePayload {
  id: string,
  item: string;
  amount: number;
  date: string;
}

interface RemoveExpensePayload {
  id: string;
}

interface EditExpensePayload {
  id: string;
  updatedExpense: ExpenseItem;
}

const initialState: ExpenseItem[] = [];

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<AddExpensePayload>) => {
      state.push(action.payload);
    },
    setExpenses: (state, action: PayloadAction<ExpenseItem[]>) => {
      const inverted = action.payload.reverse();
      return inverted;
    },
    removeExpense: (state, action: PayloadAction<RemoveExpensePayload>) => {
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1); // Remove the expense by its index
      }
    },
    updateExpense: (state, action: PayloadAction<EditExpensePayload>) => {
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedExpense;
      }
    },
  },
});

export const { addExpense, removeExpense, updateExpense, setExpenses } =
  expensesSlice.actions;
export default expensesSlice.reducer;
