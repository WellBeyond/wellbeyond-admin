import React from "react";

import {
    BooleanInput, Create,
    Datagrid,
    DateField,
    FormTab,
    NumberField,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    SelectInput, SimpleForm,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
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
            <SimpleForm toolbar={<CustomEditToolbar />} >
                <ReferenceField label="Name" source="id" reference="users" link={false}>
                    <TextField source="name" label="Name" />
                </ReferenceField>

                <ReferenceField label="Email Address" source="id" reference="users" link={false}>
                    <TextField source="email" label="Email Address" />
                </ReferenceField>

                <BooleanInput source="isAdmin" label="System Administrator?" fullWidth={true}/>
            </SimpleForm>
        </CustomEdit>);
}

export default UserEdit;