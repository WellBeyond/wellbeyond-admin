import React, { Fragment } from "react";
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
import { FormDataConsumer, SimpleFormIterator } from "react-admin";

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
                <FormTab label="Form Answers ">
                    <ArrayInput source="formQuestionsWithAnswers" fullWidth={true} >
                        <OrderedFormIterator>
                            <TextInput source="questionText" fullWidth={true} label="Question"/>
                            <TextInput source="questionType" fullWidth={true} label="Question Type" />
                            <BooleanInput source="isRequired" fullwidth={true} label="isRequired"/>
                            <FormDataConsumer {...props}>
                                {({ scopedFormData, getSource }:any) => {
                                    if (scopedFormData && scopedFormData.questionType) {
                                        if (scopedFormData.questionType === 'multi-select') {
                                            scopedFormData.answer = Object.values(scopedFormData.answer)
                                        return (
                                            <Fragment>
                                                <ArrayInput source={getSource('choices')} label={`Possible choices for: ${scopedFormData.questionText}`}>
                                                    <SimpleFormIterator disableAdd={true} disableRemove={true}>
                                                        <TextInput source="value" label="Choice Value"
                                                                    fullWidth={true}/>

                                                    </SimpleFormIterator>
                                                </ArrayInput>
                                            </Fragment>);
                                        } else if (scopedFormData.questionType === 'choose-one') {
                                            return (
                                                <Fragment>
                                                    <ArrayInput source={getSource('choices')} label={`Possible choices for: ${scopedFormData.questionText}`}>
                                                        <SimpleFormIterator disableAdd={true} disableRemove={true}>
                                                            <TextInput source="value" label="Choice Value"
                                                                       fullWidth={true}/>
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                </Fragment>);
                                        } else if (scopedFormData.questionType === 'multi-step-question') {
                                                console.log({ scopedFormData})

                                            return(
                                            <Fragment>
                                                <ArrayInput source={getSource('multi-step-question')} label='This is a multi step question, add questions in the order you would like them to be'>
                                                    <SimpleFormIterator>
                                                        <SelectInput source="questionType" fullWidth={true} label="Choose the question type for this step" choices={[
                                                        {id: 'yes-no', name: 'Yes or No'},
                                                        {id: 'number', name: 'Number Input'},
                                                        {id: 'photo', name: 'Photo Input'},
                                                        {id: 'open-ended', name: 'Open Ended'},
                                                        {id: 'additional-info', name: 'Additional Information'},
                                                        ]}/>
                                                        <TextInput source="questionText" fullWidth={true} label="Question Text"/>
                                                        <BooleanInput
                                                        source="isRequired"
                                                        label="Required?"
                                                        fullWidth={true}
                                                    />
                                                    <TextInput source="answer" fullwidth={true} label="User Answer"/>
                                                    <PhotoInput source='photo' label={"Photo"}/>
                                                </SimpleFormIterator>
                                                </ArrayInput>
                                            </Fragment>
                                            )
                                        }else if (scopedFormData.questionType === 'photo') {
                                            return(
                                            <Fragment>
                                                <ArrayInput source={getSource('answer')}>
                                                    <PhotoInput source='photo' label={"Photo"}/>
                                                </ArrayInput>
                                            </Fragment>)
                                        }
                                        else return 
                                    }
                                }}
                            </FormDataConsumer>
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