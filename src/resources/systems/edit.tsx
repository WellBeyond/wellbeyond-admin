import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    ArrayInput,
    BooleanInput,
    Datagrid,
    DateField,
    DeleteButton,
    Edit,
    EditButton,
    FormDataConsumer,
    FormTab,
    ImageField,
    NumberInput,
    ReferenceManyField,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import {AddChildButton} from '../../components/AddChildButton';
import RichTextInput from "ra-input-rich-text";

interface FormDataConsumerProps {
    formData: any;
}

const SystemEdit = (props: any) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <BooleanInput source="isSystemProperty" label="Remember this system on the system's profile" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Question">
                <SelectInput source="questionType" fullWidth={true} choices={[
                    {id: 'yes-no', name: 'Yes or No'},
                    {id: 'choose-one', name: 'Select List'},
                    {id: 'text', name: 'Text Input'},
                    {id: 'number', name: 'Number Input'}
                ]}/>
                <TextInput source="questionText" fullWidth={true}/>
                <FormDataConsumer subscription={{ values: true }}>
                    {({formData, ...rest }:FormDataConsumerProps) => formData.questionType === 'number' &&
                        <NumberInput source="minValue" />
                    }
                </FormDataConsumer>
                <FormDataConsumer subscription={{ values: true }}>
                    {({formData, ...rest }:FormDataConsumerProps) => formData.questionType === 'number' &&
                        <NumberInput source="maxValue" />
                    }
                </FormDataConsumer>
                <FormDataConsumer subscription={{ values: true }}>
                    {({formData, ...rest }:FormDataConsumerProps) => formData.questionType === 'choose-one' &&
                        <ArrayInput source="choices">
                            <SimpleFormIterator>
                                <TextInput source="label" label="Choice Label" fullWidth={true}/>
                                <TextInput source="value"  label="Choice Value" fullWidth={true}/>
                            </SimpleFormIterator>
                        </ArrayInput>
                    }
                </FormDataConsumer>
                <RichTextInput source="helpText"/>
            </FormTab>
            <FormTab label="Photos">
                <ReferenceManyField
                    addLabel={false}
                    reference="photos"
                    target="systemId"
                    sort={{field: 'createdate', order: 'DESC'}}
                >
                    <Datagrid>
                        <DateField source="createdate"/>
                        <TextField source="name"/>
                        <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                        <EditButton/>
                        <DeleteButton/>
                    </Datagrid>
                </ReferenceManyField>
                <AddChildButton parent="system" child="photo" />
            </FormTab>
            <FormTab label="Videos">
                <ReferenceManyField
                    addLabel={false}
                    reference="videos"
                    target="systemId"
                    sort={{field: 'createdate', order: 'DESC'}}
                >
                    <Datagrid>
                        <DateField source="createdate"/>
                        <TextField source="name" />
                        <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                        <EditButton/>
                        <DeleteButton/>
                    </Datagrid>
                </ReferenceManyField>
                <AddChildButton parent="system" child="video" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default SystemEdit;