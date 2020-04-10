import React, {Fragment, useCallback, useEffect, useState} from "react";
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
    crudGetMatching, useCreate, useNotify, useDataProvider
} from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LessonCreate from "../lessons/create";
import ModalToolbar from "../../components/ModalToolbar";
import PropTypes from "prop-types";
import {FieldProps, InjectedFieldProps} from "../../components/types";

const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

const AddLesson = (props) => {
    const classes = useStyles();
    const [createOpen, setCreateOpen] = useState(false);
    const [existingOpen, setExistingOpen] = useState(false);
    const [create] = useCreate('lessons');
    const notify = useNotify();
    const [allLessons, setAllLessons] = useState([]);
    const [lessonList, setLessonList] = useState([]);
    const [existingLesson, setExistingLesson] = useState('');
    const [loading, setLoading] = useState(true);
    const dataProvider = useDataProvider();
    useEffect(() => {
        dataProvider.getList('lessons', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 1000 },
        }).then(({ data }) => {
            setAllLessons(data || []);
            setLoading(false);
        })
            .catch(error => {
                setLoading(false);
            })
    }, []);

    const openCreateModal = () => {
        setExistingOpen(false);
        setCreateOpen(true);
    };
    const closeCreateModal = () => {
        setCreateOpen(false);
    };
    const handleCreateSave = (values, redirect) => {
        create(
            {
                payload: {data:values},
            },
            {
                onSuccess: ({ data: newLesson }) => {
                    props.addField({lessonId: newLesson.id});
                    notify('New lesson created', 'info', {});
                    closeCreateModal();
                },
            }
        );
    };
    const handleCreateCancel = useCallback(
        event => {
            event.preventDefault();
            closeCreateModal();
        }, []);

    const openExistingModal = () => {
        const usedMap = {};
        const existing = (props.getExistingFields ? props.getExistingFields() : []) || [];
        existing.forEach(field => {
            usedMap[field.lessonId] = true;
        });
        const available = allLessons && allLessons.filter(lesson => !usedMap[lesson.id]);
        setLessonList(available);
        setCreateOpen(false);
        setExistingOpen(true);
    };
    const closeExistingModal = () => {
        setExistingOpen(false);
    };
    const handleLessonSelected = useCallback(
        event => {
            setExistingLesson(event.target.value);
        });
    const handleExistingSave =  () => {
        props.addField({lessonId: existingLesson});
        notify('Lesson added', 'info', {});
        closeExistingModal();
    };
    const handleExistingCancel = useCallback(
        event => {
            event.preventDefault();
            closeExistingModal();
        }, []);

    
    return (
        <Fragment>
            <Button
                size="small"
                onClick={openExistingModal}
            >
                <AddIcon className={classes.leftIcon} />
                Add an Existing Lesson
            </Button>
            <Button
                size="small"
                onClick={openCreateModal}
            >
                <AddIcon className={classes.leftIcon} />
                Create a New Lesson
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={createOpen}
                onClose={handleCreateCancel}
                aria-labelledby="create-lesson-dialog-title"
            >
                <DialogTitle id="create-lesson-dialog-title">New Lesson</DialogTitle>
                <DialogContent>
                    <LessonCreate basePath="/" resource="lessons" toolbar={<ModalToolbar onCancel={handleCreateCancel} onSave={handleCreateSave}/>}>
                    </LessonCreate>
                </DialogContent>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={existingOpen}
                onClose={handleExistingCancel}
                aria-labelledby="existing-lesson-dialog-title"
            >
                <DialogTitle id="existing-lesson-dialog-title">Select an Existing Lesson</DialogTitle>
                <DialogContent>
                    <FormControl  className={classes.formControl} fullWidth={true}>
                        <InputLabel shrink id="add-existing-lesson-label">
                            Existing Lessons
                        </InputLabel>
                        <Select
                            fullWidth={true}
                            labelId="add-existing-lesson-label"
                            id="add-existing-lesson"
                            value={existingLesson}
                            onChange={handleLessonSelected}
                            displayEmpty
                            className={classes.selectEmpty}>
                            <MenuItem value="" disabled>
                                Select an existing lesson
                            </MenuItem>
                            {lessonList.map(lesson => {
                                return (
                                    <MenuItem value={lesson.id} key={lesson.id}>
                                        {lesson.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <ModalToolbar onCancel={handleExistingCancel} onSave={handleExistingSave}/>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default AddLesson;