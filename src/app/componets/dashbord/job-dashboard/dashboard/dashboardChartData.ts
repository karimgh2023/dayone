import { ChartConfiguration, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;
  

export let DonutChartData: any = {
    pieseries: [64, 45, 28, 18],
    labels: ["Applications","Interviews", "Reject", "Hired"],
    colors: ['#3366ff', '#fe7f00', '#f7284a', '#0dcd94'],
    chart: {
        type: 'donut',
        height: 330,
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
                show: false
            },
        }
    }]
};

//Line Charts
export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
        {
            label: 'Applications',
            data: [12.5, 17, 12.5, 15.5, 18, 14.5, 22, 11, 17.5, 15.5, 16, 12.5],
            backgroundColor: 'transparent',
            borderWidth: 3,
            borderColor: '#3366ff',
            hoverBorderColor: '#3366ff',
        },{
            label: 'Shortlisted',
            data: [9.5, 18, 11.2, 18, 14.5, 18, 11, 15.5, 13.5, 11.5, 13, 11],
            backgroundColor: 'transparent',
            borderWidth: 3,
            borderColor: '#d1d1db',
            hoverBorderColor: '#d1d1db',
            type: 'line',
            borderDash: [7,6],

        }, {

            label: '',
            data: [17, 23, 18, 18.5, 14, 20.5, 18, 19, 22, 20, 18.5, 24],
            backgroundColor: "#3654afde",
            borderWidth: 3,
            borderColor:'#3654afde',
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

