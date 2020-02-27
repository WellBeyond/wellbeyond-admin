import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    ShowController,
    ShowView,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    TextField,
    BooleanField,
    ArrayField,
    NumberField,
    EditButton,
    RichTextField,
    DateField,
    ImageField, Show, SimpleShowLayout
} from "react-admin";
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