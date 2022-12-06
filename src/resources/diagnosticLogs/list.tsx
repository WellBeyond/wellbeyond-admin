import React from 'react';
import {
    ArrayField,
    BooleanInput, ChipField,
    Datagrid,
    DateField,
    Filter,
    List,
    ReferenceField,
    ReferenceInput, SelectField,
    SelectInput, SingleFieldList,
    TextField
} from "react-admin";

const DiagnosticLogFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="System" source="systemId" reference="systems" fullWidth={true} allowEmpty={false}>
            <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
        </ReferenceInput>
        <BooleanInput label="Archived" source="archived" />
    </Filter>
);

const DiagnosticLogList = (props: object) => {
    return (
        <div>
            <List {...props}
                filters={<DiagnosticLogFilter />}
                perPage={25}
                sort={{field: 'started', order: 'DESC'}}
                filterDefaultValues={{ archived: false }}>
                <Datagrid optimized rowClick="edit">
                <TextField source="community" label="Community"/>
                    {/* <DateField source="started" label="Started" showTime={true}/> */}
                    <DateField source="completed" label="Completed" showTime={true}/>
                    <ArrayField label="Reported Issue" source="symptoms">
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
                    <ReferenceField
                        label={"Performed By"}
                        source={'userId'}
                        basePath={'/users'}
                        reference="users">
                        <TextField source="name"/>
                    </ReferenceField>
                    <SelectField source="status" label="Community Reported Status" choices={[
                        // {id: 'open', name: 'Open'},
                        {id: 'resolved', name: 'Resolved'},
                        // {id: 'partial', name: 'Partially Resolved'},
                        {id: 'unresolved', name: 'Unresolved'}
                    ]}/>
                    <SelectField source="adminReportedStatus" label="Organization Status" choices={[
                        {id: 'functioning', name: 'Functioning'},
                        {id: 'underreview', name: 'Under Review'},
                        {id: 'issuesreported', name: 'Issues Reported'},
                        {id: 'pendingmaintenance', name: 'Pending Maintenance'},

                    ]}/>
                    {/* <ReferenceField
                        label={"Organization"}
                        source={'organizationId'}
                        basePath={'/organizations'}
                        reference="organizations">
                        <TextField source="name"/>
                    </ReferenceField> */}
                    
                    {/* <ReferenceField
                        label={"System"}
                        source={'systemId'}
                        basePath={'/systems'}
                        reference="systems">
                        <TextField source="name"/>
                    </ReferenceField> */}
                    
                    <TextField source="updatedby" label={"Updated By"} reference='users'/>
                    <DateField label={'Last Update'}
                        source='lastupdate' /> 
                    
                </Datagrid>
            </List>
        </div>
    );
}

export default DiagnosticLogList;