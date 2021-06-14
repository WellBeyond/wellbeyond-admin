import * as React from "react";

import {
    BooleanField,
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
                        <ReferenceField label="Form Type" source="formTypeId" reference="formTypes" >
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField label="Form Name" source="formId" reference="forms" >
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField label="User" source="userId" reference="users" >
                            <TextField source="name" />
                        </ReferenceField>
                        <BooleanField source="isArchived" label="Archived?" fullWidth={true}/>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
    );
}

export default SessionShow;