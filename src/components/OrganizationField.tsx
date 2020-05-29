import React, {Fragment} from 'react';
import {ReferenceField, TextField} from "react-admin";
import {FieldProps, InjectedFieldProps} from './types';


const OrganizationField: React.FunctionComponent<FieldProps & InjectedFieldProps> = (props) => {
    const hasOrganizationId = props.record && props.record.organizationId;
    return (
        <Fragment>
            { hasOrganizationId ?
                <ReferenceField source="organizationId" reference="organizations" {...props}>
                    <TextField source="name"/>
                </ReferenceField>
                :
                <TextField source="organization" {...props}/>
            }
        </Fragment>
    )
}
export default OrganizationField;