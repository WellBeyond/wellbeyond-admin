import * as React from "react";

import {
    ArrayField, ChipField,
    DateField,
    ReferenceField,
    ShowController,
    ShowView, SingleFieldList,
    Tab,
    TabbedShowLayout,
    TextField
} from "react-admin";
import { SelectField } from "react-admin";

const DiagnosticLogShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <DateField source="started" label="Started" showTime={true}/>
                        <DateField source="completed" label="Completed" showTime={true}/>
                        <SelectField source="status" label="Status" choices={[
                            // {id: 'open', name: 'Open'},
                            {id: 'resolved', name: 'Resolved'},
                            // {id: 'partial', name: 'Partially Resolved'},
                            {id: 'unresolved', name: 'Unresolved'}
                        ]}/>
                        <ReferenceField
                            label={"Organization"}
                            source={'organizationId'}
                            basePath={'/organizations'}
                            reference="organizations">
                            <TextField source="name"/>
                        </ReferenceField>
                        <TextField source="community" label="Community"/>
                        <ReferenceField
                            label={"System"}
                            source={'systemId'}
                            basePath={'/systems'}
                            reference="systems">
                            <TextField source="name"/>
                        </ReferenceField>
                        <ReferenceField
                            label={"Diagnosed By"}
                            source={'userId'}
                            basePath={'/users'}
                            reference="users">
                            <TextField source="name"/>
                        </ReferenceField>
                        <ArrayField label="Problems" source="symptoms">
                            <SingleFieldList>
                                <ReferenceField
                                    source={'symptomId'}
                                    basePath={'/symptoms'}
                                    reference="symptoms"
                                >
                                    <ChipField source="name"/>
                                </ReferenceField>
                            </SingleFieldList>
                        </ArrayField>
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

export default DiagnosticLogShow;