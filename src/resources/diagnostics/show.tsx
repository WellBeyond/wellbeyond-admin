import * as React from "react";

import {BooleanField, RichTextField, ShowController, ShowView, Tab, TabbedShowLayout, TextField} from "react-admin";

const FactShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <TextField source="name" label="Question Text"/>
                        <BooleanField source="isSystemProperty"/>
                        <RichTextField source="description"/>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);

export default FactShow;