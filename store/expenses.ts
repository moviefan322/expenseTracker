import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { expenses as DummyExpenses, expenses } from "../data/expenses";
import { ExpenseItem } from "../types/ExpenseItem";

interface AddExpensePayload {
  expense: ExpenseItem;
}

interface RemoveExpensePayload {
  id: number;
}

interface EditExpensePayload {
  id: number;
  updatedExpense: ExpenseItem;
}

const initialState: ExpenseItem[] = DummyExpenses;

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<AddExpensePayload>) => {
      state.push(action.payload.expense);
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

export const { addExpense, removeExpense, updateExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
