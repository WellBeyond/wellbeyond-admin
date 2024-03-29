import * as React from "react";

import {
    ArrayInput,
    BooleanInput,
    DateTimeInput,
    FormTab,
    NumberInput,
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

const MaintenanceLogEdit = (props: any) => (
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
                <ReferenceInput label="Checklist" source="checklistId" reference="checklists" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <SelectInput source="organizationStatus" label="Organization Status" fullWidth={true} choices={[
                    {id: 'functioning', name: 'Functioning'},
                    {id: 'under-review', name: 'Under Review'},
                    {id: 'issues-reported', name: 'Issues Reported'},
                    {id: 'pending-maintenance', name: 'Pending Maintenance'},
                    {id: 'contact-community', name: 'Contact Community'}
                ]}/>
                <BooleanInput source="archived" label="Archived?" fullWidth={true}/>
                <DateTimeInput source="started" fullWidth={true}/>
                <DateTimeInput source="completed" fullWidth={true}/>
                <NumberInput source="stepCount" fullWidth={true} step={1} min={0}/>
                <NumberInput source="completedCount" fullWidth={true} step={1} min={0}/>
            </FormTab>
            <FormTab label="Steps">
                <ArrayInput source="steps" label=''>
                    <SimpleFormIterator disableAdd={true} disableRemove={true}>
                        <TextInput source="name" fullWidth={true} label="Step Name" disabled={true}/>
                        <SelectInput source="status" fullWidth={true} label="Was this step completed?" choices={[
                            {id: 'completed', name: 'Completed'},
                            {id: 'incomplete', name: 'Unable to Complete'},
                            {id: 'repairs-needed', name: 'Repairs Needed'}
                        ]}/>
                        <DateTimeInput source="completed" fullWidth={true} label={"Time Completed"}/>
                        <TextInput source="information" multiline fullWidth={true} label={"Information"}/>
                        <PhotoInput source='photo' label={"Photo"}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default MaintenanceLogEdit;