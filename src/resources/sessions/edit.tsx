import React from "react";
import {
    BooleanInput,
    DateTimeInput,
    FormTab,
    NumberInput,
    ReferenceField,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {TrainingLessons} from "../../components/TrainingLessons";
import OrganizationCommunityInput from "../../components/OrganizationCommunityInput";

const SessionEdit = (props: any) => {

    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <ReferenceField label="Subject" source="subjectId" reference="subjects" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Trainer" source="userId" reference="users" >
                        <TextField source="name" />
                    </ReferenceField>
                    <TextInput source="name" fullWidth={true}/>

                    <OrganizationCommunityInput isRequired={true} fullWidth={true}/>

                    <TextInput source="groupType" fullWidth={true}/>
                    <NumberInput source="groupSizeNum" fullWidth={true} label="Group size"/>
                    <DateTimeInput source="started" fullWidth={true}/>
                    <DateTimeInput source="completed" fullWidth={true}/>
                    <BooleanInput source="isArchived" label="Archived?" fullWidth={true}/>
                </FormTab>
                <FormTab label="Lessons">
                    <TrainingLessons source="lessons" fullWidth={true} />
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
}

export default SessionEdit;