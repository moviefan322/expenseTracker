export interface RootStackParamList {
  RecentExpenses: undefined;
  AllExpenses: undefined;
  EditExpense: { item: object };
  [key: string]: undefined | object;
}
