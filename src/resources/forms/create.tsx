import * as React from "react";

import {BooleanInput, Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import {PhotoInput} from "../../components/PhotoInput";
import { ReferenceArrayInput } from "react-admin";
import { SelectArrayInput } from "react-admin";

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
                <ReferenceArrayInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
                    <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false}/>
                </ReferenceArrayInput>
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
                <SelectInput
                    source="formCategory"
                    label="Form Category"
                    fullWidth={true}
                    allowEmpty={false}
                    choices={[
                    { id: "water-systems", name: "Water Systems" },
                    { id: "impact-reporting", name: "Impact Reporting" },
                    { id: "misc-reporting", name: "Misc Reporting" },
                    ]}
                />
                <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
                <RichTextInput
                  source="description"
                  fullWidth={true}
                />
                <PhotoInput source='photo' label="Photo" />
            </SimpleForm>
        </Create>
    );
};

export default FormCreate;
