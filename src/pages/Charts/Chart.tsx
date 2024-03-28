import React, { useContext, useEffect } from 'react';
import './Chart.css';
import { AuthContext, FormData } from '../../context/authContext';
import Chart from 'chart.js/auto';

const BarChart: React.FC = () => {
  const { fetchAllProducts } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchData = async () => {
      if (fetchAllProducts) {
        try {
          const data = await fetchAllProducts();
          if (Array.isArray(data)) {
            if (data.length < 10) {
              drawBarChart(data);
            } else {
              drawBarChart(data, 5); 
            }
            drawPieChart(data);
          } else {
            console.error("Invalid data received:", data);
          }
        } catch (error) {
          console.error("Error while retrieving data:", error);
        }
      }
    };
    fetchData();
  }, [fetchAllProducts]);

  const drawBarChart = (data: FormData[], numberOfProducts?: number) => {
    const ctx = document.getElementById('productBarChart') as HTMLCanvasElement;
    if (ctx) {
      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
      }

      const sortedData = data.slice().sort((a, b) => a.price - b.price);
      let selectedData;
      if (numberOfProducts) {
        const topMostExpensive = sortedData.slice(-numberOfProducts).reverse();
        const topLeastExpensive = sortedData.slice(0, numberOfProducts); 
        selectedData = [...topMostExpensive, ...topLeastExpensive];
      } else {
        selectedData = sortedData;
      }

      const labels = selectedData.map(product => product.productName);
      const prices = selectedData.map(product => product.price);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Product Price (€)',
            data: prices,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price (€)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Product Name'
              }
            }
          }
        }
      });
    }
  };

  const drawPieChart = (data: FormData[]) => {
    const ctx = document.getElementById('productPieChart') as HTMLCanvasElement;
    if (ctx) {
      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx)?.destroy();
      }

      const productCountsByManufacturer: { [key: string]: number } = {};
      data.forEach(product => {
        console.log(product)
        if (product.name in productCountsByManufacturer) {
          productCountsByManufacturer[product.name]++;
        } else {
          productCountsByManufacturer[product.name] = 1;
        }
      });

      const manufacturers = Object.keys(productCountsByManufacturer);
      const counts = manufacturers.map(manufacturer => productCountsByManufacturer[manufacturer]);

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: manufacturers,
          datasets: [{
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  };

  return (
    <div className='box'>
      <h2 className="chart-title">Bar Chart</h2>
      <div className="bar-chart-container">
        <canvas id="productBarChart"></canvas>
      </div> 
      <h2 className="chart-title">Pie Chart</h2> 
      <div className="pie-chart-container">
        <canvas id="productPieChart"></canvas>
      </div>
    </div>
  );
};

export default BarChart;