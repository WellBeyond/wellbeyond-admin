import React, {Fragment, useCallback, useState} from "react";

import {useCreate, useNotify, useRefresh} from "react-admin";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import SolutionCreate from "../solutions/create";
import ModalToolbar from "../../components/ModalToolbar";

const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

const AddSolutionButton = (props) => {
    const classes = useStyles();
    const [createOpen, setCreateOpen] = useState(false);
    const [create] = useCreate('solutions');
    const notify = useNotify();
    const refresh = useRefresh();
    const openCreateModal = () => {
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
                    notify('New solution created', 'info', {});
                    closeCreateModal();
                    refresh();
                },
            }
        );
    };
    const handleCreateCancel = useCallback(
        event => {
            event.preventDefault();
            closeCreateModal();
        }, []);

    
    return (
        <Fragment>
            <Button
                size="small"
                onClick={openCreateModal}
            >
                <AddIcon className={classes.leftIcon} />
                Add Solution
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
                    <SolutionCreate basePath="/" resource="solutions" record={{symptomId: props.record.id, askDidItWork: true}} toolbar={<ModalToolbar onCancel={handleCreateCancel} onSave={handleCreateSave}/>}>
                    </SolutionCreate>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default AddSolutionButton;