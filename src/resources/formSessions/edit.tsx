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
import { NumberInput } from "react-admin";

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
                                            if (!scopedFormData.answer.map) {
                                                scopedFormData.answer = Object.values(scopedFormData.answer).map(a => ({value: a}))
                                            }
                                            return (
                                                <Fragment>
                                                    <ArrayInput source={getSource('choices')} label={`Possible choices for: ${scopedFormData.questionText}`}>
                                                        <SimpleFormIterator disableAdd={true} disableRemove={true}>
                                                            <TextInput source="value" label="Choice Value"
                                                                        fullWidth={true}/>

                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                    <ArrayInput source={getSource('answer')}>
                                                        <SimpleFormIterator disableAdd={true} disableRemove={true}>
                                                            <TextInput source="value" label="User Answer" fullWidth={true}/>
                                                        </SimpleFormIterator>
                                                </ArrayInput>
                                                </Fragment>);
                                        } else if (scopedFormData.questionType === 'yes-no') {
                                            return (
                                                <SelectInput source={getSource('answer')} label="User Answer" fullWidth={true}
                                                             choices={[
                                                                 {id: 'yes', name: 'Yes'},
                                                                 {id: 'no', name: 'No'}
                                                             ]}/>);
                                        } else if (scopedFormData.questionType === 'number') {
                                            return <NumberInput source={getSource('answer')} label="User Answer"
                                                                fullWidth={true}/>
                                        } else if (scopedFormData.questionType === 'open-ended' || scopedFormData.questionType === 'additional-info' ) {
                                            return <TextInput source={getSource('answer')} label="User Answer"
                                                                fullWidth={true}/>
                                        } else if (scopedFormData.questionType === 'choose-one') {
                                            return (
                                                <Fragment>
                                                    <ArrayInput source={getSource('choices')} label={`Possible choices for: ${scopedFormData.questionText}`}>
                                                        <SimpleFormIterator disableAdd={true} disableRemove={true}>
                                                            <TextInput source="value" label="Choice Value"
                                                                       fullWidth={true}/>
                                                        </SimpleFormIterator>
                                                    </ArrayInput>
                                                    <TextInput source={getSource('answer')} label="User Answer"
                                                                fullWidth={true}/>
                                                </Fragment>);
                                        } else if (scopedFormData.questionType === 'multi-step-question') {
                                            scopedFormData && scopedFormData["multi-step-question"] && scopedFormData["multi-step-question"].map((question: any, index: any) => question.answer = scopedFormData.answer[index])
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
                                        } else if (scopedFormData.questionType === 'photo') {
                                            return(
                                            <Fragment>
                                                {typeof(scopedFormData.answer === 'string')?
                                                <PhotoInput source='photo' label={"Photo"}/> :
                                                <ArrayInput source={getSource('answer')}>
                                                    <PhotoInput source='photo' label={"Photo"}/>
                                                </ArrayInput>
                                            }
                                            </Fragment>)
                                        }
                                    }
                                }}
                            </FormDataConsumer>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
}

export default SessionEdit;