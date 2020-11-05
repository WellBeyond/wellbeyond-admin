import React from "react";

import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    FormTab,
    ReferenceField,
    ReferenceManyField,
    SelectField,
    SingleFieldList,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: 10,
        marginRight: '20px',
        marginBottom: 10,
        width: '95%'
    },
    header: {
        textAlign: 'center',
        width: '100%'
    },
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    }
}));


interface FormDataConsumerProps {
    formData: any;
}
const TopicEdit = (props: any) => {
    const classes = useStyles();
    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <RichTextInput source="description" fullWidth={true}/>
                    <PhotoInput source='photo' label="Photo" />
                </FormTab>
                <FormTab label="Subjects">
                    <ReferenceManyField
                        label=""
                        addlabel=''
                        reference="subjects"
                        target="topicId"
                        sort={{field: 'name', order: 'ASC'}}
                    >
                        <Datagrid rowClick="edit">
                            <TextField source="name" label="Subject name" className={classes.nameColumn}/>
                            <ReferenceField
                                source={'organizationId'}
                                basePath={'/organizations'}
                                reference="organizations">
                                <TextField source="name"/>
                            </ReferenceField>
                            <SelectField source="locale" label="Language" choices={[
                                {id: 'en', name: 'English'},
                                {id: 'fr', name: 'French'},
                                {id: 'hi', name: 'Hindi'},
                                {id: 'sw', name: 'Swahili'},
                                {id: 'so', name: 'Somali'},
                                {id: 'am', name: 'Amharic'}
                            ]}/>
                            <BooleanField source="isPublished" label="Published?"/>
                            <ArrayField label="Lessons" source="lessons">
                                <SingleFieldList>
                                    <ReferenceField
                                        source={'lessonId'}
                                        basePath={'/lessons'}
                                        reference="lessons"
                                    >
                                        <ChipField source="name"/>
                                    </ReferenceField>
                                </SingleFieldList>
                            </ArrayField>
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default TopicEdit;