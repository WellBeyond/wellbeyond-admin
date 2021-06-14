import React from "react";

import {
    BooleanInput,
    Datagrid,
    DateField,
    FormTab,
    NumberField,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import OrganizationCommunityInput from "../../components/OrganizationCommunityInput";

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
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <TextInput source="name" label="Name" fullWidth={true} validate={required('Name is required')}/>
                    <TextInput type="email" source="email" label="Email Address" fullWidth={true}/>
                    <TextInput type="tel" source="phoneNumber" label="Phone Number" fullWidth={true}/>

                    <OrganizationCommunityInput isRequired={true} fullWidth={true}/>

                    <BooleanInput source="acceptedTerms" label="Accepted Terms?" fullWidth={true}/>
                </FormTab>
                <FormTab label="Training">
                    <ReferenceManyField
                        label=""
                        addlabel=''
                        reference="sessions"
                        target="userId"
                        sort={{field: 'started', order: 'DESC'}}
                    >
                        <Datagrid rowClick="edit">
                            <ReferenceField label="Subject" source="subjectId" reference="subjects" link={false} >
                                <TextField source="name" />
                            </ReferenceField>
                            <TextField source="organization"  label="Organization"/>
                            <TextField source="community"  label="Community"/>
                            <TextField source="groupType" label="Group Type"/>
                            <NumberField source="groupSizeNum" label="Group Size"/>
                            <DateField source="started" label="Started"/>
                            <DateField source="completed" label="Completed"/>
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </CustomEdit>);
}

export default UserEdit;