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
    ImageField, SimpleForm, ReferenceInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import { AddChildButton } from '../../components/AddChildButton';
import RichTextInput from "ra-input-rich-text";
import OrderedFormIterator from "../../components/OrderedFormIterator";

interface FormDataConsumerProps {
    formData: any;
}

const SolutionEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <BooleanInput source="askAreYouAble" label="Ask if the user is able to perform the fix first" fullWidth={true}/>
                <BooleanInput source="askForPhotoBefore" label="Ask for a before photo" fullWidth={true}/>
                <BooleanInput source="askForPhotoAfter" label="Ask for an after photo" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Preconditions">
                <ArrayInput source="conditions">
                    <OrderedFormIterator>
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
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Step By Step">
                <ArrayInput source="instructions">
                    <OrderedFormIterator>
                        <RichTextInput source="step" label="Instructions" fullWidth={true}/>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Photos">
                <ReferenceManyField
                    addLabel={false}
                    reference="photos"
                    target="solutionId"
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
                <AddChildButton parent="solution" child="photo" />
            </FormTab>
            <FormTab label="Videos">
                <ReferenceManyField
                    addLabel={false}
                    reference="videos"
                    target="solutionId"
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
                <AddChildButton parent="solution" child="video" />
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default SolutionEdit;