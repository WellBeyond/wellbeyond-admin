import React, {useEffect, useState} from "react";
// tslint:disable-next-line:no-var-requires
import {BooleanInput, FormTab, TabbedForm, TextInput, Loading, Error, ArrayField, DateField, Datagrid, NumberField, ReferenceField, TextField} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import * as firebase from 'firebase';

interface FormDataConsumerProps {
    formData: any;
}
type MyProps = {
    id: string
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
                    setUserLessons({lessons: lessons.sort((a,b) => (a && b && a.started < b.started) ? -1 : 1)});
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
                <TextInput source="organization" label="Organization" fullWidth={true}/>
                <TextInput source="community" label="Community" fullWidth={true}/>
                <BooleanInput source="acceptedTerms" label="Accepted Terms?" fullWidth={true}/>
            </FormTab>
            {userLessons && <FormTab label="Training">
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <ArrayField record={userLessons} source="lessons" fullWidth={true} label={false}>
                    <Datagrid>
                        <ReferenceField label="Lesson" source="lessonId" reference="lessons" >
                            <TextField source="name" />
                        </ReferenceField>
                        <DateField showTime={true} source="started"/>
                        <DateField showTime={true} source="completed"/>
                        <NumberField source="score"/>
                    </Datagrid>
                </ArrayField>
            </FormTab>}
        </TabbedForm>
    </CustomEdit>);
}

export default UserEdit;