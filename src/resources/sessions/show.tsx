import * as React from "react";

import {
    BooleanField,
    NumberField,
    ReferenceField,
    ShowController,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField
} from "react-admin";

const SessionShow = (props: any) => {
    return (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <ReferenceField label="Subject" source="subjectId" reference="subjects" >
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField label="Trainer" source="userId" reference="users" >
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="groupType" fullWidth={true}/>
                        <NumberField source="groupSizeNum" fullWidth={true}/>
                        <BooleanField source="isArchived" label="Archived?" fullWidth={true}/>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
    );
}

export default SessionShow;