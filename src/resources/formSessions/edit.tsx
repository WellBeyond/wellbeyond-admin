import React from "react";
import {
    BooleanInput,
    DateTimeInput,
    FormTab,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {Forms} from "../../components/Forms";

const SessionEdit = (props: any) => {

    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <ReferenceField label="Form Type" source="formTypeId" reference="formTypes" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Form Name" source="formId" reference="forms" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="User" source="userId" reference="users" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                        <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                    </ReferenceInput>
                    {/* <ReferenceInput label="Form Session ID" source="formSessionId" reference="formSessions" fullWidth={true} allowEmpty={false}>
                        <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                    </ReferenceInput> */}
                    <TextInput source="community" fullWidth={true}/>
                    <DateTimeInput source="started" fullWidth={true}/>
                    <BooleanInput source="isArchived" label="Archived?" fullWidth={true}/>
                </FormTab>
                <FormTab label="Forms">
                    <Forms source="forms" fullWidth={true} />
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
}

export default SessionEdit;