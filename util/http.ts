import axios from "axios";
import { ExpenseItem } from "../types/ExpenseItem";

interface ExpenseItemNoId {
  amount: number;
  date: string;
  item: string;
}

const BACKEND_URL = "https://dummy-b2a7d-default-rtdb.firebaseio.comx";

export const storeExpense = async (expenseData: ExpenseItemNoId) => {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      item: response.data[key].item,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (updatedExpense: ExpenseItem) => {
  return axios.put(
    `${BACKEND_URL}/expenses/${updatedExpense.id}.json`,
    updatedExpense
  );
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
