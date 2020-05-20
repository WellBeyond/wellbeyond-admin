import React from "react";

import {
    ArrayInput,
    Datagrid,
    DateField,
    DeleteButton,
    EditButton,
    FormTab,
    ImageField,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import {AddChildButton} from '../../components/AddChildButton';
import OrderedFormIterator from '../../components/OrderedFormIterator';
import RichTextInput from "ra-input-rich-text";
import AddSolution from "./AddSolution";

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
                    <ArrayInput source="solutions">
                        <OrderedFormIterator addButton={<AddSolution />}>
                            <ReferenceInput label="Solution"
                                            source="solutionId"
                                            reference="solutions"
                                            disabled={true}
                                            sort={{ field: 'name', order: 'ASC' }}
                                            fullWidth={true}>
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                        </OrderedFormIterator>
                    </ArrayInput>
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