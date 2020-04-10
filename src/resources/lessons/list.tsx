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

const LessonList = (props: object) => (
    <List {...props}
          perPage={25}
          sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Lesson name"/>
        </Datagrid>
    </List>
);

export default LessonList;