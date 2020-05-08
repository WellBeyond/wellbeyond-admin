import React from 'react';
import {Edit, TopToolbar, ListButton, useTranslate} from 'react-admin';
import inflection from 'inflection';
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