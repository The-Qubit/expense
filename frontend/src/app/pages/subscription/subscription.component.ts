import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ExpenseService } from 'src/app/expense.service';
import { Subscription } from 'src/models/subscription.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  searchQuery: string = "";
  subscriptionForm!: FormGroup;
  displayStyle = "none";

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      type: ['-', Validators.required],
      date: [new Date(), Validators.required],
      user: this.dataService.getUserId(),
      temporal: ['m', Validators.required],
      period: [1, [Validators.required, Validators.min(1)]]
    });
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.expenseService.getSubscriptions(this.dataService.getUserId()).subscribe((data) => {
      // @ts-ignore
      this.subscriptions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.filteredSubscriptions = this.subscriptions;
    },
      (error) => {
        console.error('Error loading expenses', error);
      })
  }

  updateFilter(): void {
    this.filteredSubscriptions = this.subscriptions.filter(subscription =>
      subscription.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      subscription.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      subscription.amount.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      subscription.date.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    );
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

  getType(abbreviation: string) {
    if (abbreviation === "+") {
      return "Income";
    }
    return "Expense";
  }

  getTemporal(abbreviation: string) {
    if (abbreviation === "y") {
      return "Year";
    } else if (abbreviation === "m") {
      return "Month";
    } else {
      return "Day";
    }
  }
}
