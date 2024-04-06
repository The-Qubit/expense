import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { ExpenseService } from 'src/app/expense.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions: any[] = [];
  filteredSubscriptions: any[] = [];
  searchQuery: string = "";
  subscriptionForm!: FormGroup;
  displayStyle = "none";
  newSubscription = true;
  context = -1;


  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private dataService: UserService) { }

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
      this.subscriptions = data.sort((a, b) => new Date(b.next).getTime() - new Date(a.next).getTime());
      this.filteredSubscriptions = this.subscriptions;
    },
      (error) => {
        console.error('Error loading subscriptions', error);
      })
  }

  updateFilter(): void {
    const query = this.searchQuery.toLowerCase()
    this.filteredSubscriptions = this.subscriptions.filter(subscription =>
      subscription.title.toLowerCase().includes(query) ||
      subscription.category.toLowerCase().includes(query) ||
      subscription.amount.toString().toLowerCase().includes(query) ||
      this.getType(subscription.type).toLowerCase().includes(query) ||
      subscription.next.toLowerCase().includes(query) ||
      this.getTemporal(subscription.temporal).toLowerCase().includes(query) ||
      subscription.period.toString().toLowerCase().includes(query)
    );
  }

  addSubscription() {
    if (this.subscriptionForm.valid) {
      const newSubscription = this.subscriptionForm.value;
      this.expenseService.addSubscription(newSubscription).subscribe(
        (_) => {
          this.subscriptionForm.reset();
          this.searchQuery = "";
          this.loadSubscriptions();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding subscription', error);
        }
      );
    }
  }

  updateSubscription() {
    if (this.subscriptionForm.valid) {
      const updatedSubscription = this.subscriptionForm.value;
      updatedSubscription.id = this.context;
      this.expenseService.upateSubscription(updatedSubscription).subscribe(
        (_) => {
          this.subscriptionForm.reset();
          this.searchQuery = "";
          this.ngOnInit();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating subscription', error);
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

  edit(id: number) {
    this.newSubscription = false;
    const subscription = this.subscriptions.filter(subscription => subscription.id === id)[0]
    this.subscriptionForm.get("title")?.setValue(subscription.title)
    this.subscriptionForm.get("category")?.setValue(subscription.category)
    this.subscriptionForm.get("amount")?.setValue(subscription.amount)
    this.subscriptionForm.get("type")?.setValue(subscription.type)
    this.subscriptionForm.get("date")?.setValue(subscription.next)
    this.subscriptionForm.get("temporal")?.setValue(subscription.temporal)
    this.subscriptionForm.get("period")?.setValue(subscription.period)

    this.context = id;

    this.openModal()
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

  deleteSubscription() {
    this.expenseService.deleteSubscription(this.context).subscribe(
      (_) => {
        this.searchQuery = "";
        this.context = -1;
        this.newSubscription = true;
        this.subscriptionForm.reset();
        this.loadSubscriptions();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding subscription', error);
      }
    );
  }
}
