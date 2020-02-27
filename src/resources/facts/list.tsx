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

const FactList = (props: object) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" label="Fact name"/>
            <BooleanField source="isSystemProperty" label="Remember?" />
            <TextField source="questionText" />
            <TextField source="questionType" />
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export default FactList;