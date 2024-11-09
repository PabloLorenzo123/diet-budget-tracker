import { useState, useEffect } from "react";
import {Chart as Chartjs, defaults} from "chart.js/auto";
import {Doughnut} from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const DoughnutChart = ({labels, datasetLabel, emptyDatasetLabel, data, backgroundColor}) => {
    const isDataEmpty = data.every(d => d === 0);

    return (
        <div>
        <Doughnut
            data={{
                labels: labels,
                datasets: [
                    {
                        label: isDataEmpty? emptyDatasetLabel: datasetLabel,
                        data: isDataEmpty? [0.00001]: data,
                        backgroundColor : isDataEmpty? ['grey']: backgroundColor,
                        borderWidth: 0,
                    }
                ],
                
            }}

            options={{
                plugins: {
                    legend: {
                        display: false,
                        position: 'right' // Hide the legend
                    }
                }
                
            }}
        />
    </div>
    )
}

export default DoughnutChart;
