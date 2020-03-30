import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    TextField,
    NumberField,
    ImageField, DateField
} from "react-admin";

const PhotoList = (props: object) => (
    <List {...props}
        perPage={25}
        sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Photo title"/>
            <DateField source="createdate"/>
            <ImageField source="data.thumbnail_url" label="Thumbnail"/>
            <NumberField source="data.height" label="Height"/>
            <NumberField source="data.width" label="Width"/>
        </Datagrid>
    </List>
);

export default PhotoList;