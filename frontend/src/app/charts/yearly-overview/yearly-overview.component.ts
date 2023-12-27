import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-yearly-overview',
  templateUrl: './yearly-overview.component.html',
  styleUrls: ['./yearly-overview.component.css']
})
export class YearlyOverviewComponent implements OnInit {
  ngOnInit(): void {
    this.createChart()
  }
  public chart: any;

  public createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: ['Jan', 'Feb', 'Mar','Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ], 
	       datasets: [
          {
            label: "Income",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576', '124', '527', '943', '711'],
            backgroundColor: '#19A754'
          },
          {
            label: "Expenses",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541', '511', '167', '923', '723'],
            backgroundColor: '#0D6EF0'
          }  
        ]
      },
      options: {
        aspectRatio:3
      }
      
    });
  }
}
