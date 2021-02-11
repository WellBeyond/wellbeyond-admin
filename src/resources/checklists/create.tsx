import * as React from "react";

import {BooleanInput, Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    location?: {[index: string]:any},
    subject?: any,
    toolbar?: object
}

const checklistDefaultValue = { locale: 'en', steps: [] };
const ChecklistCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={checklistDefaultValue}>
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="System Type" source="systemTypeId" reference="systemTypes" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                    {id: 'en', name: 'English'},
                    {id: 'fr', name: 'French'},
                    {id: 'hi', name: 'Hindi'},
                    {id: 'sw', name: 'Swahili'},
                    {id: 'so', name: 'Somali'},
                    {id: 'am', name: 'Amharic'}
                ]}/>
                <SelectInput source="frequency" label="Recommended Frequency" fullWidth={true} choices={[
                    {id: 'daily', name: 'Every Day'},
                    {id: 'weekly', name: 'Once a Week'},
                    {id: 'biweekly', name: 'Every 2 Weeks'},
                    {id: 'monthly', name: 'Once a Month'},
                    {id: 'quarterly', name: 'Every 3 Months'},
                    {id: 'semiannual', name: 'Twice a Year'},
                    {id: 'annual', name: 'Once a Year'}
                ]}/>
                <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </SimpleForm>
        </Create>
    );
};

export default ChecklistCreate;
