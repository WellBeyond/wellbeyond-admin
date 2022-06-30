import React from 'react';
import { Bar } from 'react-chartjs-2';
import './DashboardCard.scss';

interface DashboardBarChartProps {
    title: string;
    data: any;
}

const DashboardBarChart : React.FC<DashboardBarChartProps> = ({title, data}) => {
    return (
        <div className="chartContainer">
            <h1 className='chartTitle'>{title} </h1>
            <Bar 
                data={data}
                options={{
                    /* @ts-ignore */
                    // title:{
                    // display:true,
                    // text:'Average Rainfall per month',
                    // fontSize:20
                    // },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />
        </div>
    );
}

export default DashboardBarChart;