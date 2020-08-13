import React, {Fragment, useCallback, useEffect, useState} from "react";

import {useCreate, useDataProvider, useNotify} from "react-admin";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SolutionCreate from "../solutions/create";
import ModalToolbar from "../../components/ModalToolbar";

const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

const AddSolution = (props) => {
    const classes = useStyles();
    const [createOpen, setCreateOpen] = useState(false);
    const [existingOpen, setExistingOpen] = useState(false);
    const [create] = useCreate('solutions');
    const notify = useNotify();
    const [allSolutions, setAllSolutions] = useState([]);
    const [solutionList, setSolutionList] = useState([]);
    const [existingSolution, setExistingSolution] = useState('');
    const dataProvider = useDataProvider();
    useEffect(() => {
        dataProvider.getList('solutions', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 1000 },
        }).then(({ data }) => {
            setAllSolutions(data);
        })
            .catch(error => {
            })
    }, [dataProvider]);

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
                onSuccess: ({ data: newSolution }) => {
                    props.addField({solutionId: newSolution.id});
                    notify('New solution created', 'info', {});
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
            usedMap[field.solutionId] = true;
        });
        const available = allSolutions && allSolutions.filter(solution => !usedMap[solution.id]);
        setSolutionList(available);
        setCreateOpen(false);
        setExistingOpen(true);
    };
    const closeExistingModal = () => {
        setExistingOpen(false);
    };
    const handleSolutionSelected = useCallback(
        event => {
            setExistingSolution(event.target.value);
        }, []);
    const handleExistingSave =  () => {
        props.addField({solutionId: existingSolution});
        notify('Solution added', 'info', {});
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
                Add an Existing Solution
            </Button>
            <Button
                size="small"
                onClick={openCreateModal}
            >
                <AddIcon className={classes.leftIcon} />
                Create a New Solution
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={createOpen}
                onClose={handleCreateCancel}
                aria-labelledby="create-solution-dialog-title"
            >
                <DialogTitle id="create-solution-dialog-title">New Potential Solution</DialogTitle>
                <DialogContent>
                    <SolutionCreate basePath="/" resource="solutions" toolbar={<ModalToolbar onCancel={handleCreateCancel} onSave={handleCreateSave}/>}>
                    </SolutionCreate>
                </DialogContent>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={existingOpen}
                onClose={handleExistingCancel}
                aria-labelledby="existing-solution-dialog-title"
            >
                <DialogTitle id="existing-solution-dialog-title">Select an Existing Solution</DialogTitle>
                <DialogContent>
                    <FormControl  className={classes.formControl} fullWidth={true}>
                        <InputLabel shrink id="add-existing-solution-label">
                            Existing Solutions
                        </InputLabel>
                        <Select
                            fullWidth={true}
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
                        <ModalToolbar onCancel={handleExistingCancel} onSave={handleExistingSave} fullWidth={true}/>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default AddSolution;