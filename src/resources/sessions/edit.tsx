import * as React from "react";
import {Fragment} from "react";
// tslint:disable-next-line:no-var-requires
import {
    ArrayInput,
    BooleanInput,
    FormDataConsumer,
    FormTab,
    NumberInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import RichTextInput from "ra-input-rich-text";
import OrderedFormIterator from "../../components/OrderedFormIterator";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const SessionEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />} warnWhenUnsavedChanges>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
                <PhotoInput source='photo' label="Photo"/>
            </FormTab>
            <FormTab label="Questions">
                <ArrayInput source="questions" label=''>
                    <OrderedFormIterator>
                        <SelectInput source="questionType" fullWidth={true} label="What type of question?" choices={[
                            {id: 'yes-no', name: 'Yes or No'},
                            {id: 'choose-one', name: 'Multiple Choice'},
                            {id: 'number', name: 'Number Input'}
                        ]}/>
                        <TextInput source="questionText" fullWidth={true} label="Question Text"/>
                        <FormDataConsumer {...props}>
                            {({ scopedFormData, getSource }:any) => {
                                if (scopedFormData && scopedFormData.questionType) {
                                    if (scopedFormData.questionType === 'choose-one') {
                                        return (
                                            <Fragment>
                                                <ArrayInput source={getSource('choices')} label={`Possible choices for: ${scopedFormData.questionText}`}>
                                                    <SimpleFormIterator>
                                                        <TextInput source="value" label="Choice Value"
                                                                   fullWidth={true}/>
                                                    </SimpleFormIterator>
                                                </ArrayInput>
                                                <SelectInput source={getSource('correctAnswer')} label="Correct Answer"
                                                             fullWidth={true} choices={
                                                    scopedFormData.choices ? scopedFormData.choices.map((choice: any) => {
                                                        return {id: choice && choice.value, name: choice && choice.value}
                                                    }) : []
                                                }/>
                                            </Fragment>);
                                    } else if (scopedFormData.questionType === 'yes-no') {
                                        return (
                                            <SelectInput source={getSource('correctAnswer')} label="Correct Answer" fullWidth={true}
                                                         choices={[
                                                             {id: 'yes', name: 'Yes'},
                                                             {id: 'no', name: 'No'}
                                                         ]}/>);
                                    } else if (scopedFormData.questionType === 'number') {
                                        return <NumberInput source={getSource('correctAnswer')} label="Correct Answer"
                                                            fullWidth={true}/>;
                                    }
                                }
                            }}
                        </FormDataConsumer>

                        <RichTextInput source="explanation" fullWidth={true} label={"Explanation for the correct answer"}/>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Pages">
                <ArrayInput source="pages" label={false}>
                    <OrderedFormIterator>
                        <TextInput source="title" fullWidth={true} label="Page Title"/>
                        <RichTextInput source="text" label="Session Text" fullWidth={true}/>
                        <PhotoInput source='photo' />
                        <TextInput source="photoCaption" fullWidth={true} label="Photo Caption"/>
                        <VideoInput source='video' />
                        <TextInput source="videoCaption" fullWidth={true} label="Video Caption"/>
                        <TextInput source="attestation" fullWidth={true} label="User attests to... (must be checked to continue)"/>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default SessionEdit;