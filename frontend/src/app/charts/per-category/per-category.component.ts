import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-per-category',
  templateUrl: './per-category.component.html',
  styleUrls: ['./per-category.component.css']
})
export class PerCategoryComponent implements OnInit {
  ngOnInit(): void {
    this.createChart()
  }
  public chart: any;

  createChart(){
  
    this.chart = new Chart("perCategory", {
      type: 'doughnut',
      data: {
        labels: ['Jan', 'Feb', 'Mar' ], 
	       datasets: [
          {
            label: "Expenses",
            data: ['542', '542', '536'],
            // backgroundColor: '#0D6EF0'
          }  
        ]
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
              // display: false
          },
      }
      }
    });
  }
}
