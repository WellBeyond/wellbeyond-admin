import React from 'react';
import './DashboardCard.scss';

interface DashboardSectionHeaderProps {
    sectionTitle: string;
}

const DashboardSectionHeader : React.FC<DashboardSectionHeaderProps> = ({sectionTitle}) => {
    return (
        <div className="sectionHeader">
            <h1 className='sectionTitle'>{sectionTitle} </h1>
        </div>
    );
}

export default DashboardSectionHeader;