import * as React from "react";

import {Create, required, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import { PhotoInput } from "../../components/PhotoInput";
import { SelectInput } from "react-admin";

const FormTypeCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
            <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
            <RichTextInput source="description" fullWidth={true}/>
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
            <PhotoInput source='photo' label="Icon" />

        </SimpleForm>
    </Create>
);

export default FormTypeCreate;