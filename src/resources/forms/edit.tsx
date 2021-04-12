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
// import { FormQuestionType } from '../../types'

interface FormDataConsumerProps {
  formData: any;
}

const AddChoice = ({ id }: { id: string | number}) => (
<div>
    Enter the correct answer
    <TextInput source={`correctAnswer-${id}`} label="Correct Answer" fullWidth={true} />
    Enter Other Choices
    <ArrayInput source={`options-${id}`} label="">
        <OrderedFormIterator>
            <TextInput source="option" fullWidth={true} label="Choice" />
        </OrderedFormIterator>
    </ArrayInput>

</div>
);

const FormEdit = (props: any) => {
  const [optionArray, setOptionArray] =  React.useState<(() => JSX.Element[]) | any>([]);

  const handleChange = (event: any) => {
    if ((event && event.target && event.target.value) === "mcq") {
      setOptionArray([...optionArray, AddChoice])
    }
    return;
  };

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
          <ArrayInput source="questions" label="">
            <OrderedFormIterator>
              <RichTextInput source="question" fullWidth={true} label="Question" />
              <SelectInput
                source="questionType"
                label="Question Type"
                fullWidth={true}
                allowEmpty={false}
                onChange={(event: any) => handleChange(event)}
                choices={[
                  { id: "yn", name: "Yes/No Question" },
                  { id: "mcq", name: "Multiple Choice Question" },
                  { id: "oe", name: "Open Ended Question(Text Input)" },
                  { id: "img", name: "Request Image" },
                  { id: "vid", name: "Request Video" },
                ]}
              />
              {optionArray.map((Choice: typeof AddChoice, index: any) => <Choice id={index} key={index}/>)}
            </OrderedFormIterator>
          </ArrayInput>
        </FormTab>
      </TabbedForm>
    </CustomEdit>
  );
};

export default FormEdit;
