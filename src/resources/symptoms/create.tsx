import * as React from "react";

import {Create, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const SymptomCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
            <TextInput source="name" fullWidth={true} />
        </SimpleForm>
    </Create>
);

export default SymptomCreate;