import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    DateField,
    ImageField,
    RichTextField,
    ShowController,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField
} from "react-admin";

const LessonShow = (props: any) => (
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

export default LessonShow;