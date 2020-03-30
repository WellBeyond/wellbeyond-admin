import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    TextField,
    BooleanField,
    EditButton,
    DeleteButton, ImageField, NumberField, DateField
} from "react-admin";

const VideoList = (props: object) => (
    <List {...props}
        perPage={25}
        sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Video title"/>
            <DateField source="createdate"/>
            <ImageField source="data.thumbnail_url" label="Thumbnail"/>
            <NumberField source="data.height" label="Height"/>
            <NumberField source="data.width" label="Width"/>
        </Datagrid>
    </List>
);

export default VideoList;