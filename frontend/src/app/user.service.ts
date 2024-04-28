import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/';  // Update with your Flask app's URL
  private token = "";
  private userId = -1;
  private currency = "";
  private currencyMapping: { [key: string]: string } = {"D": "$", "E": "€", "P": "£", "Y": "¥"};

  constructor(private http: HttpClient, private router: Router) { }

  public isEmailUsed(email: string): Observable<any> {
    const data = { email: email };
    return this.http.get(this.apiUrl + 'isEmailUsed', { params: data });
  }

  public signUp(email: string, password: string): Observable<any> {
    const data = { email: email, password: password };
    return this.http.post<any>(this.apiUrl + 'signup', data);
  }

  public login(email: string, password: string): Observable<any> {
    const data = { email: email, password: password };
    return this.http.post<any>(this.apiUrl + 'login', data);
  }

  public updateCurrency(currency: string) {
    this.currency = currency;
    const data = { "currency": currency, "user": this.userId };
    return this.http.post<any>(this.apiUrl + 'currency', data);
  }

  public setToken(token: string): void {
    this.token = token;

    const expires = new Date().setDate(new Date().getDate() + 1);

    document.cookie = "session=" + token; + expires;
  }

  public getToken() {
    return this.token;
  }

  public isLoggedIn() {
    if (this.token === "") {
      const cookies = document.cookie.split(";");

      if (cookies.length > 0) {
        cookies.forEach((cookie) => {
          if (cookie.includes("session")) {
            this.token = cookie.split("=")[1];
          }
        })
      }
    }
    return this.token !== "";
  }

  logout() {
    const expirationDate = new Date(0).toUTCString();
    document.cookie = "session=; expires=" + expirationDate;
    this.token = "";
    this.router.navigate(['/login']);
  }

  public setUserId(id: number): void {
    this.userId = id;
  }

  public getUserId(): number {
    return this.userId;
  }

  public setCurrency(currency: string) {
    this.currency = currency;
  }

  public getCurrencyAbbreviation() {
    return this.currency;
  }

  public getCurrency() {
    return this.currencyMapping[this.currency];
  }
}