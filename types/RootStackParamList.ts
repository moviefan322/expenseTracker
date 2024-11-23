export interface RootStackParamList {
  RecentExpenses: undefined;
  AllExpenses: undefined;
  EditExpense: { item: object };
  AddExpense: undefined;
  [key: string]: undefined | object;
}
