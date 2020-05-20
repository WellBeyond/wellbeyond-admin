import * as React from "react";

import {RichTextField, Show, SimpleShowLayout, TextField} from "react-admin";
import {CloudinaryPhotoField} from "../../components/CloudinaryPhotoField";

const PhotoShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <RichTextField source="description" />
            <CloudinaryPhotoField source="data" />
        </SimpleShowLayout>
    </Show>
);

export default PhotoShow;