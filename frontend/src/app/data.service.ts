import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:5000/';  // Update with your Flask app's URL
  private token = "";

  constructor(private http: HttpClient) {
  }

  public getData(): Observable<any> {
    return this.http.get(this.apiUrl + 'hello');
  }

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

  public setToken(token: string): void {
    this.token = token;
  }

  public isLoggedIn() {
    return this.token !== "";
  }
}