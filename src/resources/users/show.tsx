import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {BooleanField, ShowController, ShowView, Tab, TabbedShowLayout, TextField} from "react-admin";

const UserShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <TextField source="name" label="Name"/>
                        <TextField source="email" label="Email Address"/>
                        <TextField source="organization" label="Organization"/>
                        <BooleanField source="acceptedTerms" label="Accepted Terms?"/>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);

export default UserShow;