import { Component, OnInit } from '@angular/core';
import { PerCategoryChart } from 'src/app/pages/dashboard/per-category-chart';
import { UserService } from 'src/app/user.service';
import { ExpenseService } from 'src/app/expense.service';
import { CategoryStatistics, MonthlyTransaction } from 'src/models/analytics.model';
import { Transaction } from 'src/models/expense.model';
import { YearlyOverviewChart } from './yearly-overview.chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  transactions: Transaction[] = [];
  categoryStatistics: CategoryStatistics[] = [];
  expensePerCategoryChart: any;
  yearlyOverviewChart: any;
  thisYearExpenses = 0;
  totalExpenses = 0;
  totalIncome = 0;
  balance = 0;
  yearlyTransactions: MonthlyTransaction[] = [];


  constructor(private expenseService: ExpenseService, private userService: UserService) {}
  
  ngOnInit(): void {
    this.loadTransactions();
  }
  
  loadTransactions() {
    this.expenseService.getTransactions(this.userService.getUserId())
    .subscribe(
      (data) => {
        // @ts-ignore
        this.transactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.analyseTransactionsPerCategory();
        this.analyseBalance();
        this.analyseYearlyTransactions();
        this.expensePerCategoryChart = new PerCategoryChart().render(this.categoryStatistics)
        this.yearlyOverviewChart = new YearlyOverviewChart().render(this.yearlyTransactions)
        },
        (error) => {
          console.error('Error loading expenses', error);
        }
      );
  }

  getColor(type: string): object {
    if (type == "+") {
      return { color: 'green'};
    } else {
      return { color: 'red'};
    }
  }

  getSign(number: number): string {
    return number < 0 ? "-" : "+";
  }

  analyseTransactionsPerCategory() {
    this.transactions.forEach(transaction => {
      const categoryPosition = this.categoryStatistics.findIndex(i => i.category === transaction.category);
      const income = transaction.type === "+" ? transaction.amount : 0;
      const expense = transaction.type === "-" ? transaction.amount : 0;
      if (categoryPosition == -1 ) {
        this.categoryStatistics.push({
          category: transaction.category,
          income: income,
          expense: expense
        })
      }
      else {
        const category = this.categoryStatistics[categoryPosition];
        category.expense += expense; 
        category.income += income;

        this.categoryStatistics[categoryPosition] = category;
      }
    });
    this.categoryStatistics = this.categoryStatistics.filter(element => element.expense !== 0);
  }

  analyseBalance() {
    this.transactions.forEach(transaction => {
      const now = new Date();
      const transactionDate = new Date(transaction.date);
      if (transaction.type === "-") {
        this.totalExpenses += transaction.amount;
        if (transactionDate.getFullYear() === now.getFullYear()) {
          this.thisYearExpenses += transaction.amount;
        }
      } else {
        this.totalIncome += transaction.amount;
      }
    });
  }

  analyseYearlyTransactions() {
    this.createYearlyTransactionsDataStructure();

    console.log(this.yearlyTransactions)
    this.transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0);

      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth() + 1;

      const targetMonth = this.yearlyTransactions.find((mt) => mt.month === transactionMonth && mt.year === transactionYear);

      if (targetMonth) {
        if (transaction.type === '+') {
          targetMonth.income += transaction.amount;
        } else if (transaction.type === '-') {
          targetMonth.expense += transaction.amount;
        }
      }
    });
    this.yearlyTransactions.reverse();
  }

  createYearlyTransactionsDataStructure() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    for (let i = 0; i < 12; i++) {
      const month = currentMonth - i <= 0 ? 12 + (currentMonth - i) : currentMonth - i;
      const year = currentMonth - i <= 0 ? currentYear - 1 : currentYear;

      this.yearlyTransactions.push({
        month,
        year,
        expense: 0,
        income: 0,
      });
    }
  }
}
