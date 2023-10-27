import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = "Expense Tracker";
  // @ts-ignore 
  message: string;

  constructor(private apiService: DataService) {}

  ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      console.log(data)
      this.message = data.message;
    });
  }
}
