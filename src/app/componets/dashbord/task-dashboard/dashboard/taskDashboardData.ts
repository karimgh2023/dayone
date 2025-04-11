import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

//Line Charts
export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
        {
            label: 'on going',
            data: [11, 13, 13, 20, 22, 25,  17, 23, 16, 16, 15, 17, 15],
            backgroundColor: 'transparent',
            // borderWidth: 3,
            borderColor: '#3366ff',
            hoverBorderColor: '#3366ff',
        },{
            label: 'Completed',
            data: [10, 12, 12.2, 16, 18, 12, 17, 15.2, 20.2, 15, 14, 16],
            backgroundColor: 'transparent',
            // borderWidth: 3,
            borderColor: '#fe7f00',
            hoverBorderColor: '#fe7f00',

        }, {

            label: '',
            data: [13, 18, 12, 22, 18, 22, 17, 21, 20, 22, 24, 19],
            backgroundColor: '#f5f6f8',
            // borderWidth: 3,
            borderColor:'#f5f6f8',
            fill: 'origin'
        }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  
  export const lineChartOptions: ChartConfiguration['options'] | any = {

    responsive: true,
    maintainAspectRatio: false,
    layout:{
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    elements: {
      line: {
        tension: 0.5
      },
      point: {
        radius: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        ticks: {
            beginAtZero: true,
            color: "#8492a6",
        },
        grid: {
            color: "rgba(142, 156, 173,0.1)",
            display: false
        },
      },
      y: {
        grid: {
            display: true,
            drawBorder: false,
            zeroLineColor: 'rgba(142, 156, 173,0.1)',
            color: "rgba(142, 156, 173,0.1)",
        },
        ticks: {
            stepSize: 5,
            color: "#8492a6",
        },
      }
    },
  
    plugins: {
      legend: { display: false },
    }
  };
  
  export const lineChartType: ChartType = 'line';


  
// //BarChart1
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
            stacked: true,
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
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri" ,"Sat"],
    datasets: [
      { 
        barPercentage: 0.2,
        label: 'Work',
        data: [8, 6.5, 7, 8.2, 7, 7.8, 6.5],
        backgroundColor: '#3366ff',
        borderWidth: 2,
        hoverBackgroundColor: '#3366ff',
        hoverBorderWidth: 0,
        borderColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        borderRadius: 50
    },
      { 
        label: 'Working Hours',
        barPercentage: 0.2,
        data: [10, 10, 10, 10, 10, 10, 10],
        backgroundColor: '#dce2fc',
        borderWidth: 2,
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderWidth: 0,
        borderColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc'
     }
    ]
  };
  
  

  export let DonutChartData: any = {
    pieseries: [64, 35],
    colors: ['#3366ff', '#fe7f00'],
    labels: ["Completed","Running"],
    chart: {
        type: 'donut',
        height: 280,
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false,
    },
    stroke: {
       show: true,
       width:0
   },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200,
            },
            legend: {
                show: false,
                position: 'bottom'
            },
        }
    }]
};