export interface Transaction {
    id?: number;
    title: string;
    category: string;
    amount: number;
    date: Date;
    user: number;
    type: string // + -> income; - -> expense
  }