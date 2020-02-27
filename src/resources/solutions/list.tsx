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

const SolutionList = (props: object) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" label="Solution name"/>
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export default SolutionList;