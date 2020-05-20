import React from 'react';
import {Edit, ListButton, TopToolbar, useTranslate} from 'react-admin';
import PropTypes from 'prop-types';

const sanitizeRestProps = ({
                             basePath,
                             className,
                             hasList,
                             hasShow,
                             resource,
                             ...rest
                           }) => rest;


const CustomEdit = (props) => {
    const translate = useTranslate();
    const resourceName = translate(`resources.${props.resource}.name`, {
        smart_count: 1
    });
    const CustomEditActions = ({ basePath, className, hasList, ...rest }) => (
        <TopToolbar className={className} {...sanitizeRestProps(rest)}>
            {hasList && <ListButton basePath={basePath} />}
        </TopToolbar>
    );
    const CustomTitle = ({ record }) => {
      if (props.resource === 'sessions') {
        return <span>{record ? ('Training for ' + record.groupType + ' group of ' + record.groupSize + ' people on ' +
                Intl.DateTimeFormat('en', {month: "long", day: "numeric", year: "numeric"}).format(record.started)) : ''}</span>
      }
        return <span>{resourceName}: {record ? `"${record.name}"` : ''}</span>;
    };

    return (
        <Edit actions={<CustomEditActions />} title={<CustomTitle />} {...props}>
        </Edit>
    );
};

CustomEdit.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export default CustomEdit;