import * as React from "react";

import {BooleanInput, Create, DateTimeInput, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import OrganizationCommunityInput from "../../components/OrganizationCommunityInput";

type MyProps = {
    location?: {[index: string]:any},
    toolbar?: object
}

const diagnosticLogDefaultValue = { status: 'open', symptoms: [], diagnosticResults: [], solutionResults: [] };
const DiagnosticLogCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={diagnosticLogDefaultValue}>
                <TextInput source="name" fullWidth={true}/>

                <OrganizationCommunityInput isRequired={true} fullWidth={true}/>

                <ReferenceInput label="System" source="systemId" reference="systems" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="Performed By" source="userId" reference="users" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <SelectInput source="status" label="Status" fullWidth={true} choices={[
                    {id: 'open', name: 'Open'},
                    {id: 'resolved', name: 'Resolved'},
                    {id: 'partial', name: 'Partially Resolved'},
                    {id: 'unresolved', name: 'Unresolved'}
                ]}/>
                <BooleanInput source="archived" label="Archived?" fullWidth={true}/>
                <DateTimeInput source="started" fullWidth={true}/>
                <DateTimeInput source="completed" fullWidth={true}/>
            </SimpleForm>
        </Create>
    );
};

export default DiagnosticLogCreate;
