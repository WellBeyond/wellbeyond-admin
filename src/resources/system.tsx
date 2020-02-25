import * as React from "react";
import Icon from '@material-ui/icons/SentimentDissatisfied';
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Create,
    Edit,
    TabbedShowLayout,
    Tab,
    ArrayField,
    SimpleForm,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    DeleteButton,
    RichTextField,
    DateField,
    ImageField, ReferenceInput, SelectInput
} from "react-admin";

import RichTextInput from "ra-input-rich-text";

export const SymptomIcon = Icon;
export const SymptomList = (props: object) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title" />
            <ShowButton label="" />
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export const SymptomShow = (props: object) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Summary">
                <ReferenceInput label="Sympton" source="symptomId" reference="symptoms">
                    <SelectInput optionText="title" />
                </ReferenceInput>
                <TextField source="id" />
                <TextField source="title" />
                <RichTextField source="description" />
            </Tab>
            <Tab label="Conditions">
                <ArrayField source='conditions'>
                    <Datagrid>
                        <DateField source="createdate" />
                        <TextField source="title" />
                        <ShowButton />
                        <EditButton />
                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const SymptomCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="title" />
        </SimpleForm>
    </Create>
);

export const SymptomEdit = (props: object) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <RichTextInput source="description" />
        </SimpleForm>
    </Edit>
);