import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/models/expense.model';
import { DataService } from './data.service';
import { Subscription } from 'src/models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient, private dataService: DataService) {}

  addExpense(expense: Expense): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/expense`, {...expense, session_id: this.dataService.getToken()});
  }

  addSubscription(subscription: Subscription): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subscription`, {...subscription, session_id: this.dataService.getToken()});
  }

  getExpenses(user: number): Observable<any> {
    const data = { user: user,  session_id: this.dataService.getToken() };
    return this.http.get<any>(`${this.apiUrl}/expenses`, {params: data});
  }
}
