import React, {Fragment} from "react";
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
    ImageField,
    ReferenceInput,
    crudGetMatching
} from "react-admin";
import CustomEdit  from '../../components/CustomEdit';
import { AddChildButton } from '../../components/AddChildButton';
import { OrderedFormIterator } from '../../components/OrderedFormIterator';
import SolutionArrayInput from '../solutions/SolutionArrayInput';
import RichTextInput from "ra-input-rich-text";

interface FormDataConsumerProps {
    formData: any;
}
const SymptomEdit = (props: any) => {

    return (
        <CustomEdit {...props}>
            <TabbedForm>
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <RichTextInput source="description" fullWidth={true}/>
                </FormTab>
                <FormTab label="Potential Solutions">
                    <SolutionArrayInput label="Solution"
                                        source="solutionId"
                                        reference="solutions"
                                        sort={{ field: 'name', order: 'ASC' }}
                                        />
                </FormTab>
                <FormTab label="Potential Root Causes">
                    <ArrayInput source="causes">
                        <OrderedFormIterator>
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
                        </OrderedFormIterator>
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
                            <TextField source="name"/>
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
                            <TextField source="name" />
                            <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                            <EditButton/>
                            <DeleteButton/>
                        </Datagrid>
                    </ReferenceManyField>
                    <AddChildButton parent="symptom" child="video" />
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default SymptomEdit;