import React from 'react';
import './DashboardCard.scss';
import { Link } from 'react-router-dom'

interface DashboardSectionHeaderProps {
    sectionTitle: string;
    link: string;
}

const DashboardSectionHeader : React.FC<DashboardSectionHeaderProps> = ({sectionTitle, link}) => {
    return (
        <div className="sectionHeader">
            <Link to={link} className='sectionTitle'>{sectionTitle} </Link>
        </div>
    );
}

export default DashboardSectionHeader;