import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconContentAdd from '@material-ui/icons/Add';
import DialogActions from '@material-ui/core/DialogActions';
import ModalToolbar from '../../components/ModalToolbar';
import SolutionPreview from './SolutionPreview'

import {
    ArrayInput,
    crudGetMatching,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    TextField,
    TopToolbar,
    useCreate,
    useNotify,
    useTranslate,
    useDataProvider,
    useInput,
    Loading,
    Error
} from 'react-admin';
import OrderedFormIterator from "../../components/OrderedFormIterator";
import SolutionCreate from "./create";

const useStyles = makeStyles(
    theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        button: {
            margin: '10px 24px',
            position: 'relative',
        },
        line: {
            display: 'flex',
            listStyleType: 'none',
            borderBottom: `solid 1px ${theme.palette.divider}`,
            [theme.breakpoints.down('xs')]: {display: 'block'},
            '&.fade-enter': {
                opacity: 0.01,
                transform: 'translateX(100vw)',
            },
            '&.fade-enter-active': {
                opacity: 1,
                transform: 'translateX(0)',
                transition: 'all 500ms ease-in',
            },
            '&.fade-exit': {
                opacity: 1,
                transform: 'translateX(0)',
            },
            '&.fade-exit-active': {
                opacity: 0.01,
                transform: 'translateX(100vw)',
                transition: 'all 500ms ease-in',
            },
        },
    })
);

const SolutionArrayInput = props => {
    const {reference, record} = props;
    const translate = useTranslate();
    const classes = useStyles();
    const [solutions, setSolutions] = useState(record[reference] || []);
    const [open, setOpen] = useState(false);
    const [existingSolution, setExistingSolution] = useState('');
    const [allSolutions, setAllSolutions] = useState([]);
    const [solutionList, setSolutionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const dataProvider = useDataProvider();
    const {
        input: { value, onChange },
        meta: { touched, error },
        isRequired
    } = useInput(props);

    useEffect(() => {
        dataProvider.getList('solutions', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 1000 },
        }).then(({ data }) => {
                setAllSolutions(data);
                filterExistingSolutions(data, record[reference]);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }, []);

    const filterExistingSolutions = (existing, used) => {
        const usedMap = {};
        used && used.length && used.forEach(val => {
            usedMap[val.solutionId] = true;
        });
        const available = existing && existing.filter(solution => !usedMap[solution.id]);
        setSolutionList(available);
    };

    const handleClickOpen = useCallback(
        event => {
            event.preventDefault();
            setOpen(true);
        }
    );

    const closeModal = () => {
        setOpen(false);
    };
    const [create] = useCreate('solutions');
    const notify = useNotify();
    const handleArrayChanged = (values) => {
        filterExistingSolutions(allSolutions, values);
    };
    const handleSolutionSelected = useCallback(
        event => {
            record[reference] = record[reference] || [];
            record[reference].push({solutionId: event.target.value});
            handleArrayChanged(record[reference]);
            onChange(record[reference]);
        });

    const handleSave = (values, redirect) => {
        create(
            {
                payload: {data:values},
            },
            {
                onSuccess: ({ data: newSolution }) => {
                    notify('New solution created', 'info', {});
                    record[reference] = record[reference] || [];
                    record[reference].push({solutionId: newSolution.id});
                    handleArrayChanged(record[reference]);
                    onChange(record[reference]);
                    closeModal();
                },
            }
        );
    };
    const handleCancel = useCallback(
        event => {
            event.preventDefault();
            closeModal();
        });

    return (
        <Fragment>
            <ArrayInput source={reference}>
                <OrderedFormIterator disableAdd={true} onChange={onChange}>
                    <ReferenceField {...props}>
                        <TextField source="name" />
                    </ReferenceField>
                </OrderedFormIterator>
            </ArrayInput>
            <FormControl  className={classes.formControl} >
                <InputLabel shrink id="add-existing-solution-label">
                    Existing Solutions
                </InputLabel>
                <Select
                        labelId="add-existing-solution-label"
                        id="add-existing-solution"
                        value={existingSolution}
                        onChange={handleSolutionSelected}
                        displayEmpty
                        className={classes.selectEmpty}>
                    <MenuItem value="" disabled>
                        Select an existing solution
                    </MenuItem>
                    {solutionList.map(solution => {
                        return (
                            <MenuItem value={solution.id} key={solution.id}>
                                {solution.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleCancel}
                aria-labelledby="create-solution-dialog-title"
            >
                <DialogTitle id="create-solution-dialog-title">New Solution</DialogTitle>
                <DialogContent>
                    <SolutionCreate basePath="/" resource="solutions" toolbar={<ModalToolbar onCancel={handleCancel} onSave={handleSave}/>}>
                    </SolutionCreate>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default SolutionArrayInput;
