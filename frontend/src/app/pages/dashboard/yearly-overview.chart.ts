import Chart from 'chart.js/auto';
import { CategoryStatistics, MonthlyTransaction } from 'src/models/analytics.model';

export class YearlyOverviewChart {
    public chart: any;

    public render(yearlyTransactions: MonthlyTransaction[]) {
        const monthsAbbreviation = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        const labels = yearlyTransactions.map(
            montlyTransaction => monthsAbbreviation[montlyTransaction.month - 1] + " " + montlyTransaction.year.toString().slice(-2));

        const expenses = yearlyTransactions.map(montlyTransaction => montlyTransaction.expense);
        const income = yearlyTransactions.map(montlyTransaction => montlyTransaction.income);
        this.chart = new Chart("yearlyOverviewChart", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Income",
                        data: income,
                        backgroundColor: '#19A754'
                    },
                    {
                        label: "Expenses",
                        data: expenses,
                        backgroundColor: '#0D6EF0'
                    }
                ]
            },
            options: {
                aspectRatio: 4,
            }
        });
    }
}
