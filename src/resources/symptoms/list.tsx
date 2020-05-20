import * as React from "react";

import {Datagrid, List, TextField} from "react-admin";

const SymptomList = (props: object) => (
    <List {...props}
          perPage={25}
          sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Symptom name"/>
        </Datagrid>
    </List>
);

export default SymptomList;