import * as React from "react";

import {
    DateField,
    ImageField,
    ReferenceField,
    RichTextField,
    ShowController,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField
} from "react-admin";

const SubjectShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <TextField source="name"/>
                        <ReferenceField
                            source={'topicId'}
                            basePath={'/topics'}
                            reference="topics">
                            <TextField source="name"/>
                        </ReferenceField>
                        <ReferenceField
                            source={'organizationId'}
                            basePath={'/organizations'}
                            reference="organizations">
                            <TextField source="name"/>
                        </ReferenceField>
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