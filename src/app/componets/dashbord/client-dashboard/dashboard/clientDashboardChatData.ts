import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
  
// //BarChart1
export const barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 20
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
                stepSize: 5,
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
        label: 'Projects',
        categoryPercentage: 0.45,
        data: [27, 18, 27, 23, 17, 19, 22.5, 19.5, 17.5, 18.5, 19.8, 27],
        borderWidth: 0,
        backgroundColor: '#dbe2fc',
        borderColor: '#dbe2fc',
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
        borderRadius: 50
    },
      { 
        label: 'Expenses',
        categoryPercentage: 0.45,
        data: [29.5, 22, 23, 17, 20.5, 21, 24.8, 17, 15.8, 21, 22, 28.5],
        borderWidth: 0,
        backgroundColor: '#3366ff',
        borderColor: '#3366ff',
        hoverBackgroundColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        borderRadius: 50
     }
    ]
  };
  
  

  export let DonutChartData: any = {
    series: [80, 29, 50],
    labels: ["Design", "Service","Development"],
    chart: {
        height: 260,
        type: 'donut',
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },

    legend: {
        show: false,
		position: "bottom",
		horizontalAlign: "center",
		offsetY: 8,
		fontWeight: "normal",
		fontSize: '14px',

		markers: {
			width: 12,
			height: 12,
			strokeWidth: 0,
			strokeColor: '#fff',
			fillColors: undefined,
			radius: 4,
			customHTML: undefined,
			onClick: undefined,
			offsetX: 0,
			offsetY: 0
		},
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: "#fff",
        width: 0,
        dashArray: 0,
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '80%',
                background: 'transparent',
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '20px',
                        // color: '#495057',
                        offsetY: -13
                    },
                    value: {
                        show: true,
                        fontSize: '30px',
                        fontWeight: 500,
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val: string) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: false,
                        label: 'Total Analysis',
                        fontSize: '18px',
                        fontWeight: 400,
                    }

                }
            }
        }
    },
    colors: ["rgba(51, 102, 255, 1)", "rgba(254, 127, 0, 1)"],
};

//Line Charts
export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
        {
            label: 'Expenses',
            data: [15, 32, 15, 38, 18, 25,  22],
            backgroundColor: 'transparent',
            borderWidth: 3,
            borderColor: '#3366ff',
            hoverBorderColor: '#3366ff',
        },
        {
            label: '',
            data: [25, 28, 21, 33, 18, 36, 18],
            backgroundColor: '#3654afde',
            borderWidth: 3,
            borderColor:'#3654afde',
            fill: 'origin'
        }
    ],
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
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
            stepSize: 10,
            color: "#8492a6",
        },
      }
    },
  
    plugins: {
      legend: { display: false },
    }
  };
  
  export const lineChartType: ChartType = 'line';

