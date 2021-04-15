import * as React from "react";

import {BooleanInput, Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    location?: {[index: string]:any},
    subject?: any,
    toolbar?: object
}

const formDefaultValue = { locale: 'en', questions: [] };
const FormCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={formDefaultValue}>
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <SelectInput
                  source="locale"
                  label="Language"
                  fullWidth={true}
                  choices={[
                    {id: 'en', name: 'English'},
                    {id: 'fr', name: 'French'},
                    {id: 'hi', name: 'Hindi'},
                    {id: 'sw', name: 'Swahili'},
                    {id: 'so', name: 'Somali'},
                    {id: 'am', name: 'Amharic'}
                ]}/>
                <ReferenceInput label="Form Type" source="formTypeId" reference="formTypes" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
                <RichTextInput
                  source="description"
                  fullWidth={true}
                />
            </SimpleForm>
        </Create>
    );
};

export default FormCreate;
