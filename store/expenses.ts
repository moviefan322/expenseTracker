import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { expenses as DummyExpenses, expenses } from "../data/expenses";
import { ExpenseItem } from "../types/ExpenseItem";

interface AddRemoveExpensePayload {
  expense: ExpenseItem;
}

const initialState: ExpenseItem[] = DummyExpenses;

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<AddRemoveExpensePayload>) => {
      state.push(action.payload.expense);
    },
    removeExpense: (state, action: PayloadAction<AddRemoveExpensePayload>) => {
      state.splice(state.indexOf(action.payload.expense), 1);
    },
  },
});

export const { addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
