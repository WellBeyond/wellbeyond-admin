import * as React from "react";

import {Create, SimpleForm, TextInput} from "react-admin";

const SymptomCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="name" fullWidth={true} />
        </SimpleForm>
    </Create>
);

export default SymptomCreate;