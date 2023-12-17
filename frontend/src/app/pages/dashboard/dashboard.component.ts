import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/data.service';
import { ExpenseService } from 'src/app/expense.service';
import { Transaction } from 'src/models/expense.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  transactions: Transaction[] = [];

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
        },
        (error) => {
          console.error('Error loading expenses', error);
        }
      );
  }

  getColor(type: string): object {
    // Logic to determine styles based on data
    if (type == "+") {
      return { color: 'green'};
    } else {
      return { color: 'red'};
    }
  }

  analyseTransactions() {
    
  }
}

// type TransactionStatistics = {
//   categoryStatistics: CategoryStatistics[];
// }

type MontlyTransaction = {
  month: string;
  income: number;
  expense: number;
}

type CategoryStatistics = {
  category: string;
  income: number;
  expense: number;
}