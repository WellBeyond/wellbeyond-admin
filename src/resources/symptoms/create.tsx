import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {Create, SimpleForm, TextInput} from "react-admin";

const SymptomCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="name" fullWidth={true} />
        </SimpleForm>
    </Create>
);

export default SymptomCreate;