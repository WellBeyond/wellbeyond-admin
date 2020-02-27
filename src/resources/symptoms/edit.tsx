import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    FormDataConsumer,
    Edit,
    TabbedForm,
    FormTab,
    ReferenceManyField,
    TextInput,
    BooleanInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    EditButton,
    DeleteButton,
    DateField,
    TextField,
    ImageField, ReferenceInput
} from "react-admin";
import { AddChildButton } from '../../components/AddChildButton';
import RichTextInput from "ra-input-rich-text";

interface FormDataConsumerProps {
    formData: any;
}

const SymptomEdit = (props: any) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Potential Solutions">
                <ArrayInput source="choices">
                    <SimpleFormIterator>
                        <ReferenceInput label="Solution" source="solutionId" reference="solutions" fullWidth={true}>
                            <SelectInput optionText="name" fullWidth={true}/>
                        </ReferenceInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Potential Root Causes">
                <ArrayInput source="causes">
                    <SimpleFormIterator>
                        <ReferenceInput label="Root Cause Symptom" source="symptomId" reference="symptoms" fullWidth={true}>
                            <SelectInput optionText="name" fullWidth={true}/>
                        </ReferenceInput>
                        <ArrayInput source="conditions" label="What would lead you to think this is the root cause?">
                            <SimpleFormIterator>
                                <ReferenceInput label="Fact" source="factId" reference="facts">
                                    <SelectInput optionText="name" />
                                </ReferenceInput>
                                <SelectInput source="relationship" label="Relationship" choices={[
                                    {id: '==', name: 'Equals'},
                                    {id: '<', name: 'Is Less Than'},
                                    {id: '<=', name: 'Is Less Than Or Equal To'},
                                    {id: '>', name: 'Is Greater Than'},
                                    {id: '>=', name: 'Is Greater Than Or Equal To'}
                                ]}/>
                                <TextInput source="value" label="Value" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Photos">
                <ReferenceManyField
                    addLabel={false}
                    reference="photos"
                    target="symptomId"
                    sort={{field: 'createdate', order: 'DESC'}}
                >
                    <Datagrid>
                        <DateField source="createdate"/>
                        <TextField source="title" fullWidth={true}/>
                        <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                        <EditButton/>
                        <DeleteButton/>
                    </Datagrid>
                </ReferenceManyField>
                <AddChildButton parent="symptom" child="photo" />
            </FormTab>
            <FormTab label="Videos">
                <ReferenceManyField
                    addLabel={false}
                    reference="videos"
                    target="symptomId"
                    sort={{field: 'createdate', order: 'DESC'}}
                >
                    <Datagrid>
                        <DateField source="createdate"/>
                        <TextField source="title" fullWidth={true} />
                        <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                        <EditButton/>
                        <DeleteButton/>
                    </Datagrid>
                </ReferenceManyField>
                <AddChildButton parent="symptom" child="video" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default SymptomEdit;