import { Transaction } from "./expense.model";

export interface Subscription extends Transaction {
    next?: Date;
    temporal: string
    period: number
}