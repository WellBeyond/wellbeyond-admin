import React from 'react';
import './DashboardCard.scss';

//creating a props interface for the DashboardCard components types
interface DashboardCardProps {
    cardTitle: string;
    cardContent: any;
}

const DashboardCard : React.FC<DashboardCardProps> = ({cardTitle, cardContent}) => {
    return (
        <div className="cardBody"> 
            <h1 className='cardContentTitle'>{cardTitle} </h1>
            <h1 className='cardContent'>{cardContent} </h1>
        </div>
    );
}

export default DashboardCard;