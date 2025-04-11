
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
      x: {
        stacked: false,
        ticks: {
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
            color: "rgba(142, 156, 173,0.1)",
        },
        ticks: {
            stepSize: 5,
            color: "#8492a6"
        },
      }
    },
    plugins: {
      legend: {
        display: true,
        labels:{
          color: '#a8b3d7'
        }
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
      { barPercentage: .8,
        categoryPercentage: 0.38,
        label: 'TOTAL BUDGET',
        data: [27,17,19,23,17,19,23,17,13,28,22,27],
        borderWidth: 0,
        backgroundColor: '#ccd9ff',
        borderColor: '#ccd9ff',
        hoverBackgroundColor: '#ccd9ff',
        hoverBorderColor: '#ccd9ff',
        borderRadius: 50
    },
    { 
      label: 'AMOUNT USED',
      barPercentage: .8,
      categoryPercentage: 0.38,
      data: [28,22,21,18,13,22,24,18,16,21,18,24],
      borderWidth: 0,
      backgroundColor: '#3366ff',
      borderColor: '#3366ff',
      hoverBackgroundColor: '#3366ff',
      hoverBorderColor: '#3366ff',
      borderRadius: 50
    }]

  };
  

    export let DonutChartData: any = {
      series: [14, 8, 20, 18],
      labels: ["Casual Leaves","Sick Leaves", "Gifted Leaves", "Remaining Leaves"],
      chart: {
          height: 310,
          type: 'donut',
      },
      dataLabels: {
          enabled: false,
      },
  
      legend: {
          show: false,
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 8,
      fontWeight: "bold",
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
              donut: {
                  size: '85%',
                  background: 'transparent',
                  labels: {
                      show: true,
                      name: {
                          show: true,
                          fontSize: '29px',
                          color:'#6c6f9a',
                          offsetY: -10
                      },
                      value: {
                          show: true,
                          fontSize: '26px',
                          color: undefined,
                          offsetY: 16,
                      },
                      total: {
                          show: true,
                          showAlways: false,
                          label: 'Total Leaves',
                          fontSize: '22px',
                          fontWeight: 600,
                          color: '#373d3f',
                      }
  
                  }
              }
          }
      },
      colors: ["rgba(51, 102, 255, 1)", "rgba(247, 40, 74, 1)", "rgba(254, 127, 0, 1)", "rgba(1, 195, 83, 1)"],
};