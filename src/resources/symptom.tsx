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
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    DeleteButton,
    RichTextField,
    DateField,
    ImageField
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
                <TextField source="id" />
                <TextField source="title" />
                <RichTextField source="description" />
            </Tab>
            <Tab label="Photos">
                <ReferenceManyField
                    addLabel={false}
                    reference="photos"
                    target="symptomId"
                    sort={{ field: 'created_at', order: 'DESC' }}
                >
                    <Datagrid>
                        <DateField source="createdate" />
                        <TextField source="title" />
                        <ImageField source="data.thumbnail_url" label="Thumbnail" />
                        <ShowButton />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
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