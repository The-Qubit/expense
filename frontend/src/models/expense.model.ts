export interface Transaction {
    title: string;
    category: string;
    amount: number;
    date: Date;
    user: number;
    type: string // + -> income; - -> expense
  }