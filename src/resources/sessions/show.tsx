import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    BooleanField,
    DateField, FormTab,
    ImageField, ReferenceField,
    RichTextField,
    ShowController,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField
} from "react-admin";

const SessionShow = (props: any) => (
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
                        <TextField source="groupSize" fullWidth={true}/>
                        <BooleanField source="isArchived" label="Archived?" fullWidth={true}/>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);

export default SessionShow;