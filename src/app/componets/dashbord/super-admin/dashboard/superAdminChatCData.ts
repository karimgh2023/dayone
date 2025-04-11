import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;
import DataLabelsPlugin from 'chartjs-plugin-datalabels';


//BarChart1
export const barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
        
        y: {
            beginAtZero: true,
            grid: {
                display: true,
                color: "rgba(142, 156, 173,0.1)",
            },
            ticks: {
                color: "#8492a6",
            },
            
        },
        x: {
            stacked: false,
            ticks: {
                color: "#8492a6",
            },
            grid: {
                color: "rgba(142, 156, 173,0.1)",
                display: false
            },

        }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false
      }
    }
  };
  export const barChartType: ChartType = 'bar';
  export const barChartPlugins = [
    DataLabelsPlugin
  ];
  export const barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { 
        label: 'Income',
        categoryPercentage: 0.4,
        barPercentage: 0.8,
        data: [20,17,27,23,17,19,23,17,13,28,22,27],
        borderWidth: 2,
        backgroundColor: '#dbe2fc',
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
        borderColor: '#dbe2fc',
        borderRadius: 50
    },
    {
        label: 'Expense',
        categoryPercentage: 0.4,
        barPercentage: 0.8,
        data: [28,22,21,18,13,22,24,18,16,21,18,24],
        borderWidth: 3,
        backgroundColor: '#3366ff',
        hoverBackgroundColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        borderColor: '#3366ff',
        borderRadius: 50
     }
    ]
  };