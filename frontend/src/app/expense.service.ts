import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/models/expense.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient, private dataService: DataService) {}

  addExpense(expense: Expense): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/expense`, {...expense, session_id: this.dataService.getToken()});
  }
}
