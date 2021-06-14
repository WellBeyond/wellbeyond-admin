import * as React from "react";

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
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: 10,
        marginRight: '20px',
        marginBottom: 10,
        width: '95%'
    },
    header: {
        textAlign: 'center',
        width: '100%'
    }
}));

const FactEdit = (props: any) => {
    const classes = useStyles();
    return <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Question">
                <SelectInput source="questionType" fullWidth={true} choices={[
                    {id: 'yes-no', name: 'Yes or No'},
                    {id: 'choose-one', name: 'Select List'},
                    {id: 'number', name: 'Number Input'}
                ]}/>
                <TextInput source="questionText" fullWidth={true}/>
                <FormDataConsumer subscription={{values: true}}>
                    {({formData, ...rest}: FormDataConsumerProps) => formData.questionType === 'number' &&
                      <NumberInput source="minValue"/>
                    }
                </FormDataConsumer>
                <FormDataConsumer subscription={{values: true}}>
                    {({formData, ...rest}: FormDataConsumerProps) => formData.questionType === 'number' &&
                      <NumberInput source="maxValue"/>
                    }
                </FormDataConsumer>
                <FormDataConsumer subscription={{values: true}}>
                    {({formData, ...rest}: FormDataConsumerProps) => formData.questionType === 'choose-one' &&
                      <ArrayInput source="choices">
                        <SimpleFormIterator>
                          <TextInput source="label" label="Choice Label" fullWidth={true}/>
                          <TextInput source="value" label="Choice Value" fullWidth={true}/>
                        </SimpleFormIterator>
                      </ArrayInput>
                    }
                </FormDataConsumer>
                <RichTextInput source="helpText"/>
            </FormTab>
            <FormTab label="Photos">
                <ArrayInput source="photos" label="">
                    <SimpleFormIterator>
                        <PhotoInput source="url" label="Photo"/>
                        <TextInput source="title" label="Photo Title" fullWidth={true}/>
                        <RichTextInput source="description" label="Photo Description" fullWidth={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Videos">
                <ArrayInput source="photos" label="">
                    <SimpleFormIterator>
                        <VideoInput source="url" label="Video"/>
                        <TextInput source="title" label="Video Title" fullWidth={true}/>
                        <RichTextInput source="description" label="Video Description" fullWidth={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
};

export default FactEdit;