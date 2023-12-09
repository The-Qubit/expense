import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ExpenseService } from 'src/app/expense.service';
import { Expense } from 'src/models/expense.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: any[] = [];
  searchQuery: string = "";
  displayStyle = "none";
  expenseForm!: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private dataService: DataService) {}
  
  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), Validators.required],
      type: ['-', Validators.required],
      user: this.dataService.getUserId()
    });
    this.loadExpenses();
  }


  loadExpenses() {
    this.expenseService.getExpenses(this.dataService.getUserId())
      .subscribe(
        (data) => {
          // @ts-ignore
          this.expenses = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.filteredExpenses = this.expenses;
        },
        (error) => {
          console.error('Error loading expenses', error);
        }
      );
  }

  updateFilter(): void {
    console.log('Search Query:', this.searchQuery);
    this.filteredExpenses = this.expenses.filter(expense =>
      expense.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      expense.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      expense.amount.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      expense.date.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Filtered Expenses:', this.filteredExpenses);
  }

  addExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.expenseService.addExpense(newExpense).subscribe(
        (response) => {
          console.log('Expense added successfully', response);
          this.searchQuery = "";
          this.loadExpenses();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding expense', error);
        }
      );
    }
  }

  openModal(): void {
    this.displayStyle = "block";
  }

  closeModal(): void {
    this.displayStyle = "none";
  }

  getColor(type: string): object {
    // Logic to determine styles based on data
    if (type == "+") {
      return { color: 'green'};
    } else {
      return { color: 'red'};
    }
  }
}
