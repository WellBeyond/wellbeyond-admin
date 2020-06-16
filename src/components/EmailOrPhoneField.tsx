import React, {Fragment} from 'react';
import {TextField} from "react-admin";
import {FieldProps, InjectedFieldProps} from './types';


const EmailOrPhoneField: React.FunctionComponent<FieldProps & InjectedFieldProps> = (props) => {
    const hasEmail = props.record && props.record.email;
    return (
        <Fragment>
            { hasEmail ?
                <TextField source="email" {...props}/>
                :
                <TextField source="phoneNumber" {...props}/>
            }
        </Fragment>
    )
}
export default EmailOrPhoneField;