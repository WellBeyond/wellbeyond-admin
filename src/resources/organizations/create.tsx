import * as React from "react";

import {Create, SimpleForm, TextInput} from "react-admin";

const organizationDefaultValue = { locale: 'en', communities: [] };
const SubjectCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm initialValues={organizationDefaultValue} >
            <TextInput source="name" fullWidth={true}/>
        </SimpleForm>
    </Create>
);

export default SubjectCreate;