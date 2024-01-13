import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";

const options={
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips:{
        mode:"index",
        intersect: false,
        callbacks:{
            label: function (tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes:[
            
            {
                gridLines: {
                    display: true,
                },
                type: "time",
                time:{
                format: "MM/DD/YY",
                tooltipFormat:"ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value,index,values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

const buildChartData = (data, casesType="cases") => {
    let chartData = [];
    let lastDataPoint;

    for(let date in data.cases) {
        if (lastDataPoint){
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            };
            chartData.push(newDataPoint);
        };
        lastDataPoint = data[casesType][date];
    }

    return chartData;
}
  
function LineGraph({casesType, ...props}) {
    const [data, setData] = useState({});
    const [backgroundColor, setBackgroundColor] = useState('rgba(255, 0, 0, 0.3)');
    const [borderColor, setBorderColor] = useState('#CC1034');

    useEffect(()=>{
        const fetchData = async() => { 
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => { return response.json()})
            .then((data) => {
                let chartData = buildChartData(data, casesType);
                setData(chartData);
                if(casesType === "recovered"){
                    setBackgroundColor('rgba(51, 204, 51, 0.3)');
                    setBorderColor("#33cc33");
                }
                else
                if(casesType === "deaths"){
                    setBackgroundColor('rgba(89, 51, 204, 0.3)');
                    setBorderColor("#5933cc");
                }
                else {
                    setBackgroundColor('rgba(255, 0, 0, 0.3)');
                    setBorderColor("#CC1034");
                }
            }); 
        };
        fetchData();
    },[casesType]);

    return (
        <div className={props.className}>
            {data?.length > 0 && (    
                <Line
                options={options} 
                data={{
                datasets:[{
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    data: data,
                }]
                }}/>
            )}
        </div>
    )
}

export default LineGraph
