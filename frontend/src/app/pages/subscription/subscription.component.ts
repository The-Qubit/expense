import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ExpenseService } from 'src/app/expense.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit{
  subscriptionForm!: FormGroup;
  displayStyle = "none";

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private dataService: DataService) {}

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), Validators.required],
      user: this.dataService.getUserId(),
      temporal: ['m', Validators.required],
      period: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addSubscription() {
    if (this.subscriptionForm.valid) {
      const newSubscription = this.subscriptionForm.value;
      this.expenseService.addSubscription(newSubscription).subscribe(
        (response) => {
          console.log('Subscription added successfully', response);
        },
        (error) => {
          console.error('Error adding subscription', error);
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

  edit() {
    console.log("edit");
    }
}
