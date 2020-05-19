import React from 'react';
import {useSelector} from 'react-redux';
import {BooleanField, RichTextField, SimpleShowLayout, TextField} from 'react-admin';

const SolutionPreview = props => {
    const record = useSelector(
        state =>
            state.admin.resources[props.resource]
                ? state.admin.resources[props.resource].data[props.id]
                : null,
        [props.resource, props.id]
    );
    const version = useSelector(state => state.admin.ui.viewVersion);
    useSelector(state => state.admin.loading > 0);

    return (
        <SimpleShowLayout version={version} record={record} {...props}>
            <TextField source="id"/>
            <TextField source="name"/>
            <BooleanField source="askAreYouAble"/>
            <BooleanField source="askForPhotoBefore"/>
            <BooleanField source="askForPhotoAfter"/>
            <RichTextField source="description"/>
        </SimpleShowLayout>
    );
};

export default SolutionPreview;
