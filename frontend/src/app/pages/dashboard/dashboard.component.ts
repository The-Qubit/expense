import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Chart from 'chart.js/auto';
import { PerCategoryChart } from 'src/app/pages/dashboard/per-category-chart';
import { DataService } from 'src/app/data.service';
import { ExpenseService } from 'src/app/expense.service';
import { CategoryStatistics } from 'src/models/analytics.model';
import { Transaction } from 'src/models/expense.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  transactions: Transaction[] = [];
  categoryStatistics: CategoryStatistics[] = [];
  expensePerCategoryChart: any;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private dataService: DataService) {}
  
  ngOnInit(): void {
    this.loadTransactions();
  }
  
  loadTransactions() {
    this.expenseService.getTransactions(this.dataService.getUserId())
    .subscribe(
      (data) => {
        // @ts-ignore
        this.transactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.analyseTransactions()
        this.expensePerCategoryChart = new PerCategoryChart().render(this.categoryStatistics)
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

  analyseTransactions() {
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
}
