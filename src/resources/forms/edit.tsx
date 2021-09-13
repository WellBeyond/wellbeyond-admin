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
import {PhotoInput} from "../../components/PhotoInput";
import { FormDataConsumer } from "react-admin";
import { SimpleFormIterator } from "react-admin";
import { Fragment } from "react";
import { ReferenceArrayInput, SelectArrayInput } from "react-admin";

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
          <ReferenceArrayInput
            label="Organization"
            source="organizationId"
            reference="organizations"
            fullWidth={true}
            allowEmpty={false}
            validate={required("Please select an organization")}
          >
            <SelectArrayInput
              optionText="name"
              fullWidth={true}
              allowEmpty={false}
            />
          </ReferenceArrayInput>
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
            source="formCategory"
            label="Form Category"
            fullWidth={true}
            allowEmpty={false}
            choices={[
              { id: "water-systems", name: "Water Systems" },
              { id: "impact-reporting", name: "Impact Reporting" },
              { id: "misc-reporting", name: "Misc Reporting" },
            ]}
          />
          <ReferenceInput label="Form Type" source="formTypeId" reference="formTypes" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
            <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
          </ReferenceInput>
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
                            {id: 'additional-info', name: 'Additional Information'},
                            {id: 'multi-select', name: 'Multi-select Question'},
                            {id: 'multi-step-question', name: 'Multi-step Question'}

                        ]}/>
                        <TextInput source="questionText" fullWidth={true} label="Question Text"/>
                        {/* <TextInput source="questionDescription" fullWidth={true} label="Explain or give more details on your answer"/> */}
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
                                    } else if (scopedFormData.questionType === 'multi-select') {
                                      return (
                                          <Fragment>
                                              <ArrayInput source={getSource('choices')} label={`Possible choices for: ${scopedFormData.questionText}`}>
                                                  <SimpleFormIterator>
                                                      <TextInput source="value" label="Choice Value"
                                                                 fullWidth={true}/>
                                                  </SimpleFormIterator>
                                              </ArrayInput>
                                          </Fragment>);
                                    } else if (scopedFormData.questionType === 'multi-step-question') {
                                        return(
                                          <Fragment>
                                            <ArrayInput source={getSource('multi-step-question')} label='This is a multi step question, add questions in the order you would like them to be'>
                                              <SimpleFormIterator>
                                                <SelectInput source="questionType" fullWidth={true} label="Choose the question type for this step" choices={[
                                                  {id: 'yes-no', name: 'Yes or No'},
                                                  {id: 'number', name: 'Number Input'},
                                                  {id: 'photo', name: 'Photo Input'},
                                                  {id: 'open-ended', name: 'Open Ended'},
                                                  {id: 'additional-info', name: 'Additional Information'},
                                                ]}/>
                                                <TextInput source="questionText" fullWidth={true} label="Question Text"/>
                                                <BooleanInput
                                                  source="isRequired"
                                                  label="Required?"
                                                  fullWidth={true}
                                              />
                                              </SimpleFormIterator>
                                            </ArrayInput>
                                          </Fragment>
                                        )
                                    }
                                    else return
                                }
                            }}
                        </FormDataConsumer>
                        <PhotoInput source='photo' label="Photo" />
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
      </TabbedForm>
    </CustomEdit>
  );
};

export default FormEdit;
