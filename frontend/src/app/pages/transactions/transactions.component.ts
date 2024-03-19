import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { ExpenseService } from 'src/app/expense.service';
import { Transaction } from 'src/models/expense.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  searchQuery: string = "";
  displayStyle = "none";
  expenseForm!: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private userService: UserService) {}
  
  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), Validators.required],
      type: ['-', Validators.required],
      user: this.userService.getUserId()
    });
    this.loadTransactions();
  }


  loadTransactions() {
    this.expenseService.getTransactions(this.userService.getUserId())
      .subscribe(
        (data) => {
          // @ts-ignore
          this.transactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.filteredTransactions = this.transactions;
        },
        (error) => {
          console.error('Error loading expenses', error);
        }
      );
  }

  updateFilter(): void {
    this.filteredTransactions = this.transactions.filter(expense =>
      expense.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      expense.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      expense.amount.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      expense.date.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.expenseService.addExpense(newExpense).subscribe(
        (_) => {
          this.searchQuery = "";
          this.loadTransactions();
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
