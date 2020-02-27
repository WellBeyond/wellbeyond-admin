import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab, SelectInput, FormTab
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const FactCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="name" fullWidth={true} />
            <SelectInput source="questionType" fullWidth={true} choices={[
                {id: 'yes-no', name: 'Yes or No'},
                {id: 'choose-one', name: 'Select List'},
                {id: 'text', name: 'Text Input'},
                {id: 'number', name: 'Number Input'}
            ]}/>
            <TextInput source="questionText" fullWidth={true}/>
            <BooleanInput source="isSystemProperty" label="Remember this fact on the system's profile" fullWidth={true}/>
        </SimpleForm>
    </Create>
);

export default FactCreate;