import React from 'react';
import './DashboardCard.scss';

//creating a props interface for the DashboardCard components types
interface DashboardCardOverallProps {
    cardTitle: string;
    cardContent: any;
}

const DashboardCardOverall : React.FC<DashboardCardOverallProps> = ({cardTitle, cardContent}) => {
    return (
        <div className="cardOverallBody"> 
            <h1 className='cardContentOverallTitle'>{cardTitle} </h1>
            <h1 className='cardOverallContent'>{cardContent}%</h1>
        </div>
    );
}

export default DashboardCardOverall;