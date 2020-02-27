import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    TextField,
    BooleanField,
    EditButton,
    DeleteButton
} from "react-admin";

const SymptomList = (props: object) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" label="Symptom name"/>
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export default SymptomList;