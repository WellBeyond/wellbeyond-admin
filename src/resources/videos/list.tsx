import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    TextField,
    BooleanField,
    EditButton,
    DeleteButton, ImageField, NumberField
} from "react-admin";

const VideoList = (props: object) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" label="Video title"/>
            <ImageField source="data.thumbnail_url" label="Thumbnail"/>
            <NumberField source="data.height" label="Height"/>
            <NumberField source="data.width" label="Width"/>
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export default VideoList;