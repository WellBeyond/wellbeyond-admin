import React, { Fragment } from "react";

import {
    FormDataConsumer,
    ReferenceArrayInput,
    ReferenceField,
    SelectArrayInput,
    required,
    SimpleForm,
    TextField
} from "react-admin";
import AdminType from './AdminType';
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

type MyProps = {
    id: string,
    record: any,
}


const UserEdit: React.FunctionComponent<MyProps> = (props) => {

    return (
        <CustomEdit {...props}>
            <SimpleForm toolbar={<CustomEditToolbar/>}>
                <ReferenceField label="Name" source="id" reference="users" link={false}>
                    <TextField source="name" label="Name"/>
                </ReferenceField>

                <ReferenceField label="Email Address" source="id" reference="users" link={false}>
                    <TextField source="email" label="Email Address"/>
                </ReferenceField>

                <FormDataConsumer>
                    {(formDataProps:any) => (
                        <AdminType {...formDataProps}/>
                    )}
                </FormDataConsumer>

                

                <FormDataConsumer subscription={{values: true}}>
                    {({formData, ...rest}: FormDataConsumerProps) => (formData.isClientAdmin || formData.isMaintenanceUser) &&
                    <Fragment> 

                      <ReferenceArrayInput label="Which Organizations?" source="organizations" reference="organizations"
                                           fullWidth={true}>
                        <SelectArrayInput optionText="name"/>
                      </ReferenceArrayInput>
                      <SelectArrayInput
                        source="permittedResources"
                        label="Permitted Resources"
                        fullWidth={true}
                        allowEmpty={false}
                        validate={required('Please select one or more system type(s)')}
                        choices={[
                        { id: "diagnostic-logs", name: "Diagnostic Logs" },
                        { id: "maintenance-logs", name: "Maintenance Logs" },
                        { id: "training-sessions", name: "Training Sessions"},
                        { id: "form-sessions", name: "For Sessions"}
                        ]}
                    />
                    </Fragment>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </CustomEdit>);
}

export default UserEdit;