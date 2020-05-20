import * as React from "react";

import {BooleanField, Datagrid, List, TextField} from "react-admin";

const FactList = (props: object) => (
    <List {...props}
          perPage={25}
          sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Fact name"/>
            <BooleanField source="isSystemProperty" label="Remember?" />
            <TextField source="questionText" />
            <TextField source="questionType" />
        </Datagrid>
    </List>
);

export default FactList;