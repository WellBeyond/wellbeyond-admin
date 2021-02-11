import * as React from "react";

import {BooleanInput, Create, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const FactCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
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