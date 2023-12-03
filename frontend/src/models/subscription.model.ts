import { Expense } from "./expense.model";

export interface Subscription extends Expense {
    next?: Date;
    temporal: string
    period: number
}