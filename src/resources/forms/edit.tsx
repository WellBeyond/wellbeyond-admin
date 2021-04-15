import * as React from "react";

import {
  ArrayInput,
  BooleanInput,
  FormTab,
  ReferenceInput,
  required,
  SelectInput,
  TabbedForm,
  TextInput,
} from "react-admin";
import CustomEdit from "../../components/CustomEdit";
import RichTextInput from "ra-input-rich-text";
import OrderedFormIterator from "../../components/OrderedFormIterator";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import { FormDataConsumer } from "react-admin";
import { SimpleFormIterator } from "react-admin";
import { Fragment } from "react";
import { NumberInput } from "react-admin";

interface FormDataConsumerProps {
  formData: any;
}

const FormEdit = (props: any) => {
  return (
    <CustomEdit {...props}>
      <TabbedForm toolbar={<CustomEditToolbar />}>
        <FormTab label="Form Summary">
          <TextInput
            source="name"
            fullWidth={true}
            validate={required("Name is required")}
          />
          <ReferenceInput
            label="Organization"
            source="organizationId"
            reference="organizations"
            fullWidth={true}
            allowEmpty={false}
            validate={required("Please select an organization")}
          >
            <SelectInput
              optionText="name"
              fullWidth={true}
              allowEmpty={false}
            />
          </ReferenceInput>
          <SelectInput
            source="locale"
            label="Language"
            fullWidth={true}
            choices={[
              { id: "en", name: "English" },
              { id: "fr", name: "French" },
              { id: "hi", name: "Hindi" },
              { id: "sw", name: "Swahili" },
              { id: "so", name: "Somali" },
              { id: "am", name: "Amharic" },
            ]}
          />
          <SelectInput
            source="formType"
            label="Form Type"
            fullWidth={true}
            allowEmpty={false}
            choices={[
              { id: "svf", name: "Site Visit" },
              { id: "wof", name: "Work Oversight" },
              { id: "fsf", name: "Facility Survey" },
            ]}
          />
          <BooleanInput
            source="isPublished"
            label="Published?"
            fullWidth={true}
          />
          <RichTextInput
            source="description"
            fullWidth={true}
            toolbar={[["bold", "italic", "underline", "link"]]}
          />
        </FormTab>
        <FormTab label="Questions">
                <ArrayInput source="questions" label=''>
                    <OrderedFormIterator>
                        <SelectInput source="questionType" fullWidth={true} label="What type of question?" choices={[
                            {id: 'yes-no', name: 'Yes or No'},
                            {id: 'choose-one', name: 'Multiple Choice'},
                            {id: 'number', name: 'Number Input'},
                            {id: 'photo', name: 'Photo Input'},
                            {id: 'open-ended', name: 'Open Ended'},
                            {id: 'additional-info', name: 'Additional Information'}

                        ]}/>
                        <TextInput source="questionText" fullWidth={true} label="Question Text"/>
                        <BooleanInput
                            source="isRequired"
                            label="Required?"
                            fullWidth={true}
                        />
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
                                            </Fragment>);
                                    } else return
                                }
                            }}
                        </FormDataConsumer>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
      </TabbedForm>
    </CustomEdit>
  );
};

export default FormEdit;
