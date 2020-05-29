import * as React from "react";

import {
    ArrayField,
    ChipField,
    ShowController,
    ShowView,
    SimpleShowLayout,
    SingleFieldList,
    TextField
} from "react-admin";

const OrganizationShow = (props: any) => {
    return (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField source="name" fullWidth={true}/>
                    <ArrayField label="Communities" source="communities">
                        <SingleFieldList>
                            <ChipField source="name"/>
                        </SingleFieldList>
                    </ArrayField>
                </SimpleShowLayout>
            </ShowView>
        }
    </ShowController>
    );
}

export default OrganizationShow;