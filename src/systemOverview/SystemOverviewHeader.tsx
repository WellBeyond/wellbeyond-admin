import React from 'react';
import { Link } from 'react-router-dom'
import './SystemOverviewStyle.scss';

interface SystemOverviewHeaderProps {
    sectionTitle: string;
    link: string;
}

const SystemOverviewHeader : React.FC<SystemOverviewHeaderProps> = ({sectionTitle, link}) => {
    return (
        <div className="systemOverviewHeader">
            <Link to={link} className='systemOverviewTitle'>{sectionTitle} </Link>
        </div>
    );
}

export default SystemOverviewHeader;