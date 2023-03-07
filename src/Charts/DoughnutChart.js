import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(Tooltip, Legend, ArcElement)

const DoughnutChart = () => {
  const [chart, setChart] = useState([])

  var baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10'
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var apikey = 'coinranking5a3217fd02e9beaaecb48fc511944a19fbe7057ad2f7fbef'

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apikey}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log(json)
            setChart(json.data)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchCoins()
  }, [baseUrl, proxyUrl, apikey])
  console.log('chart', chart)

  var data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of vote',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  }

  return (
    <div>
      <Doughnut data={data} height={400} options={options} />
    </div>
  )
}

export default DoughnutChart
