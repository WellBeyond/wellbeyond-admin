import React, {useEffect, useState} from "react";

import {
    ArrayField,
    BooleanInput,
    Datagrid,
    DateField,
    Error,
    FormTab,
    Loading,
    NumberField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import * as firebase from 'firebase';

interface FormDataConsumerProps {
    formData: any;
}
type MyProps = {
    id: string,
    record: any,
}


const UserEdit: React.FunctionComponent<MyProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userLessons, setUserLessons] = useState<any>();
    useEffect(() => {
        let lessons:any[] =[];
        if (props.id) {
            firebase
                .firestore()
                .collection("users")
                .doc(props.id)
                .collection('lessons')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(function (doc) {
                        if (doc.exists) {
                            let lesson = doc.data();
                            lesson.started = lesson.started ? lesson.started.toDate() : undefined;
                            lesson.completed = lesson.completed ? lesson.completed.toDate() : undefined;
                            lessons.push(lesson);
                        }
                    });
                    lessons = lessons.sort((a:any,b:any) => {
                        if (!b || !b.started) return -1;
                        if (!a || !a.started) return 1;
                        return (a.started > b.started) ? 1 : -1
                    });
                    setUserLessons({lessons: lessons});
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                });
        }
    }, [props.id]);

    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} warnWhenUnsavedChanges>
                <FormTab label="Summary">
                    <TextInput source="name" label="Name" fullWidth={true}/>
                    <TextInput type="email" source="email" label="Email Address" fullWidth={true}/>
                    <TextInput type="tel" source="phoneNumber" label="Phone Number" fullWidth={true}/>
                    <ReferenceInput label="Organization (selected) " source="organizationId" reference="organizations" fullWidth={true} allowEmpty={true}>
                        <SelectInput optionText="name" fullWidth={true} allowEmpty={true} />
                    </ReferenceInput>
                    <TextInput source="organization" label="Organization" fullWidth={true}/>
                    <TextInput source="community" label="Community" fullWidth={true}/>
                    <BooleanInput source="acceptedTerms" label="Accepted Terms?" fullWidth={true}/>
                </FormTab>
                {userLessons && <FormTab label="Training">
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                  <ArrayField record={userLessons} source="lessons" fullWidth={true} label=''>
                    <Datagrid>
                      <ReferenceField label="Lesson" source="lessonId" reference="lessons" >
                        <TextField source="name" />
                      </ReferenceField>
                      <DateField showTime={true} source="started"/>
                      <DateField showTime={true} source="completed"/>
                      <NumberField source="preScore" label="Initial Score"/>
                      <NumberField source="score" label="Final Score"/>
                    </Datagrid>
                  </ArrayField>
                </FormTab>}
            </TabbedForm>
        </CustomEdit>);
}

export default UserEdit;