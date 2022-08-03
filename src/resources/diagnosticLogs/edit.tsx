import * as React from "react";

import {
    ArrayInput,
    BooleanInput,
    DateTimeInput,
    FormTab,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {PhotoInput} from "../../components/PhotoInput";
import OrganizationCommunityInput from "../../components/OrganizationCommunityInput";

interface FormDataConsumerProps {
    formData: any;
}

const DiagnosticLogEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />} >
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>

                <OrganizationCommunityInput isRequired={true} fullWidth={true}/>

                <ReferenceInput label="System" source="systemId" reference="systems" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="Performed By" source="userId" reference="users" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <SelectInput source="status" label="Status" fullWidth={true} choices={[
                    // {id: 'open', name: 'Open'},
                    {id: 'resolved', name: 'Resolved'},
                    // {id: 'partial', name: 'Partially Resolved'},
                    {id: 'unresolved', name: 'Unresolved'}
                ]}/>
                <SelectInput source="adminReportedStatus" label="Updated Status (Note to Admins: Only update this after confirming the actual status of the water system)" fullWidth={true} choices={[
                    {id: 'underreview', name: 'Under Review'},
                    {id: 'issuesreported', name: 'Issues Reported'},
                    {id: 'pendingmaintenance', name: 'Pending Maintenance'},
                    {id: 'contactcommunity', name: 'Contact Community'}
                ]}/>
                <BooleanInput source="archived" label="Archived?" fullWidth={true}/>
                <DateTimeInput source="started" fullWidth={true}/>
                <DateTimeInput source="completed" fullWidth={true}/>
                <TextInput source="information" multiline fullWidth={true} label={"Information"}/>
                <PhotoInput source='photo' label={"Photo"}/>
            </FormTab>
            <FormTab label="Problems">
                <ArrayInput source="symptoms" label=''>
                    <SimpleFormIterator disableAdd={true} disableRemove={true}>
                        <TextInput source="symptom" fullWidth={true} label="Problem" disabled={true}/>
                        <BooleanInput source="resolved" fullWidth={true} label={"Is the problem fixed?"}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Questions Asked">
                <ArrayInput source="diagnosticResults" label=''>
                    <SimpleFormIterator disableAdd={true} disableRemove={true}>
                        <TextInput source="question" fullWidth={true} label="Question" disabled={true}/>
                        <SelectInput source="answer" label="Answer" fullWidth={true} choices={[
                            {id: 'yes', name: 'Yes'},
                            {id: 'no', name: 'No'},
                            {id: 'unknown', name: 'Unknown'}
                        ]}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Solutions Attempted">
                <ArrayInput source="solutionResults" label=''>
                    <SimpleFormIterator disableAdd={true} disableRemove={true}>
                        <TextInput source="symptom" fullWidth={true} label="Problem" disabled={true}/>
                        <TextInput source="solution" fullWidth={true} label="Solution" disabled={true}/>
                        <SelectInput source="didItWork" label="Did it fix the problem?" fullWidth={true} choices={[
                            {id: 'yes', name: 'Yes - problem solved'},
                            {id: 'no', name: 'No - the problem still exists'},
                            {id: 'unable', name: 'Unable to attempt the solution'}
                        ]}/>
                        <TextInput source="information" multiline fullWidth={true} label={"Information"}/>
                        <PhotoInput source='photo' label={"Photo"}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default DiagnosticLogEdit;