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
    ImageField
} from "react-admin";

const SubjectShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <TextField source="name"/>
                        <RichTextField source="description"/>
                        <ImageField source="photo"/>
                        <DateField source="createdate"/>
                        <DateField source="lastupdate"/>
                        <TextField source="createdby"/>
                        <TextField source="updatedby"/>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);

export default SubjectShow;