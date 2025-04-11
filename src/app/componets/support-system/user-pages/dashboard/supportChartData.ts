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
        barPercentage: 0.8,
				label: 'Total Open Tickets',
				categoryPercentage: 0.4,
				data: [20,17,27,23,17,19,23,17,13,28,22,27],
        backgroundColor: '#dbe2fc',
        borderWidth: 2,
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderWidth: 0,
        borderColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
        borderRadius: 50
    },
      { barPercentage: 0.8,
        label: 'Total Closed Tickets',
				categoryPercentage: 0.4,
				data: [28,22,21,18,13,22,24,18,16,21,18,24],
        borderWidth: 3,
        backgroundColor: '#3366ff',
        hoverBackgroundColor: '#3366ff',
        borderColor: '#3366ff',
        borderRadius: 50
     }
    ]
  };

// //BarChart2
export const barChartOptions1: ChartConfiguration['options'] = {
    
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
  export const barChartType1: ChartType = 'bar';
  export const barChartPlugins1 = [
    DataLabelsPlugin
  ];
  export const barChartData1: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { 
        barPercentage: 0.8,
        label: 'Total Assigned Tickets',
				categoryPercentage: 0.2,
				data: [20, 17, 14, 13, 17, 19, 20, 17, 13, 18, 12, 17],
        backgroundColor: '#3366ff',
        borderWidth: 2,
        hoverBackgroundColor: '#3366ff',
        hoverBorderWidth: 0,
        borderColor: '#3366ff',
        hoverBorderColor: '#3366ff',
    },
      { 
        label: 'Total Closed Tickets',
				categoryPercentage: 0.2,
				barPercentage: 0.8,
				data: [28, 22, 21, 28, 23, 22, 24, 28, 26, 25, 28, 24],
        backgroundColor: '#fe7f00',
        borderWidth: 2,
        hoverBackgroundColor: '#fe7f00',
        hoverBorderWidth: 0,
        borderColor: '#fe7f00',
        hoverBorderColor: '#fe7f00',
        borderRadius: 50
     },
     {
        label: '',
        categoryPercentage: 0.2,
        barPercentage: 0.8,
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        backgroundColor: '#dbe2fc',
        borderWidth: 2,
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderWidth: 0,
        borderColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
     }
    ]
  };
  
  

  export let DonutChartData: any = {
    series: [64, 45],
    labels: ["New Tickets", "Closed Tickets"],
    chart: {
        height: 300,
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
                        color: '#495057',
                        offsetY: -4
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val: string) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#495057',
                    }

                }
            }
        }
    },
    colors: ["rgb(51, 102, 255)", "rgb(254, 127, 0)"],
};
export let BarChartData:any ={
  series: [{
    name: 'On Progress',
    data: [25, 45, 41, 67, 22, 43, 44, 45, 41, 67, 22, 43]
}, {
    name: 'Pending',
    data: [35, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27]
}, {
    name: 'COmpleted',
    data: [40, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
}],
chart: {
    type: 'bar',
    height: 315,
    stacked: true,
    toolbar: {
        show: false
    },
    zoom: {
        enabled: true
    }
},
grid: {
    borderColor: '#f1f1f1',
    strokeDashArray: 3
},
responsive: [{
    breakpoint: 480,
    options: {
        legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
        }
    }
}],
colors: ["rgba(51, 102, 255, 1)", "rgba(254, 127, 0, 0.5)", "rgba(51, 102, 255, 0.2)"],
legend: {
    show: false,
    position: 'top'
},
plotOptions: {
    bar: {
        columnWidth: "18%",
  borderRadius: 2,
    }
},
dataLabels: {
    enabled: false
},
xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
labels: {
        rotate: -90
    }
},
fill: {
    opacity: 1
}
}