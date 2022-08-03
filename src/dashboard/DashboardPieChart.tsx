import React from 'react';
import { Pie } from 'react-chartjs-2';
import './DashboardCard.scss';

interface DashboardPieChartProps {
    title: string;
    data: any;
}

const DashboardPieChart : React.FC<DashboardPieChartProps> = ({title, data}) => {
    return (
        <div className="pieChartContainer">
            <h1 className='pieChartTitle'>{title} </h1>
            <Pie 
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
                    position:'right',
                    },
                    responsive: true 
                }}
            />
        </div>
    );
}

export default DashboardPieChart;