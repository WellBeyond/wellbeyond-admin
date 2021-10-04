import React from "react";
import {
    BooleanInput,
    DateTimeInput,
    FormTab,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import { ArrayInput } from "react-admin";
import { OrderedFormIterator } from "../../components/OrderedFormIterator";
import { PhotoInput } from "../../components/PhotoInput";

const SessionEdit = (props: any) => {

    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <ReferenceField label="Form Type" source="formTypeId" reference="formTypes" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Form Name" source="formId" reference="forms" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="User" source="userId" reference="users" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                        <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                    </ReferenceInput>
                    <TextInput source="community" fullWidth={true}/>
                    <DateTimeInput source="started" fullWidth={true}/>
                    <BooleanInput source="isArchived" label="Archived?" fullWidth={true}/>
                </FormTab>
                <FormTab label="Forms">
                    <ArrayInput source="formQuestionsWithAnswers" fullWidth={true} >
                        <OrderedFormIterator>
                            <TextInput source="questionText" fullWidth={true} label="Question"/>
                            <TextInput source="questionType" fullWidth={true} label="Question Type" />
                            <BooleanInput source="isRequired" fullwidth={true} label="isRequired"/>
                            <TextInput source="answer" fullwidth={true} label="User Answer"/>
                            <PhotoInput source='photo' />
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
}

export default SessionEdit;