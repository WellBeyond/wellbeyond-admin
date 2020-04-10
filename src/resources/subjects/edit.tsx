import React, {Fragment, useCallback, useState} from "react";
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
    ReferenceField,
    ReferenceInput,
    crudGetMatching, useCreate, useNotify
} from "react-admin";
import CustomEdit  from '../../components/CustomEdit';
import OrderedFormIterator from '../../components/OrderedFormIterator';
import RichTextInput from "ra-input-rich-text";
import AddLesson from "./AddLesson";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";

interface FormDataConsumerProps {
    formData: any;
}
const SubjectEdit = (props: any) => {
    return (
        <CustomEdit {...props}>
            <TabbedForm>
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <RichTextInput source="description" fullWidth={true}/>
                    <PhotoInput source='photo' />
                </FormTab>
                <FormTab label="Lessons">
                    <ArrayInput source="lessons">
                        <OrderedFormIterator addButton={<AddLesson />}>
                            <ReferenceInput label="Lesson"
                                            source="lessonId"
                                            reference="lessons"
                                            disabled={true}
                                            sort={{ field: 'name', order: 'ASC' }}
                                            fullWidth={true}>
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default SubjectEdit;