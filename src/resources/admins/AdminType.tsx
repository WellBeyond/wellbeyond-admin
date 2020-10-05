import React, {Fragment} from "react";
import {BooleanInput} from "react-admin";
import {useForm} from 'react-final-form';

const AdminType = (props:any) => {
    const form = useForm();

    return (
        <Fragment>
            <BooleanInput source="isAdmin" label="System Administrator" fullWidth={true}
                          helperText="All Organizations"
                          onChange={(value:any) => {if (value) {form.change('isClientAdmin', false);form.change('organizations',[])}}}
                          {...props}/>
            <BooleanInput source="isClientAdmin" label="Client Administrator" fullWidth={true}
                          helperText="Specific Organization(s)"
                          onChange={(value:any) => {if (value) form.change('isAdmin', false)}}
                          {...props}/>
        </Fragment>
    );
};
export default AdminType;