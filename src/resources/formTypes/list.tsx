import * as React from "react";

import {Datagrid, List, TextField} from "react-admin";
import { ImageField } from "react-admin";

const FormTypeList = (props: object) => (
    <List {...props}
          perPage={25}
          sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Form Type name"/>
            <ImageField source="photo"/>types
        </Datagrid>
    </List>
);

export default FormTypeList;