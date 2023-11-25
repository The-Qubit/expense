import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/expense.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenseForm!: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private dataService: DataService) {}

  ngOnInit() {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), Validators.required],
      user: this.dataService.getUserId()
    });
  }

  addExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.expenseService.addExpense(newExpense).subscribe(
        (response) => {
          console.log('Expense added successfully', response);
        },
        (error) => {
          console.error('Error adding expense', error);
        }
      );
    }
  }
}