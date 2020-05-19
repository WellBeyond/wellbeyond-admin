import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {RichTextField, Show, SimpleShowLayout, TextField} from "react-admin";
import {CloudinaryVideoField} from "../../components/CloudinaryVideoField";

const VideoShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <RichTextField source="description" />
            <CloudinaryVideoField source="data" />
        </SimpleShowLayout>
    </Show>
);

export default VideoShow;