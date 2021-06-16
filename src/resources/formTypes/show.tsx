import * as React from "react";

import {DateField, RichTextField, ShowController, ShowView, Tab, TabbedShowLayout, TextField} from "react-admin";

const FormTypeShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <TextField source="name"/>
                        <RichTextField source="description"/>
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

export default FormTypeShow;