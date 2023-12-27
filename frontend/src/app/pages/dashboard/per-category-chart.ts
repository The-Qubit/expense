import Chart from 'chart.js/auto';
import { CategoryStatistics } from 'src/models/analytics.model';

export class PerCategoryChart {
  public chart: any;

  public render(categoryStatistics: CategoryStatistics[]) {
    const labels = categoryStatistics.map(stat => stat.category);
    const data = categoryStatistics.map(stat => stat.expense);
    this.chart = new Chart("expensePerCategoryChart", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expenses",
            data: data,
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
          title: {
            display: true,
            text: 'Expenses per Category'
        }
        }
      }
    });
  }
}
