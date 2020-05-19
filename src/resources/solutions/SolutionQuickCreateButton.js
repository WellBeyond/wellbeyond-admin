import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {Button, crudGetMatching, useCreate, useNotify} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconContentAdd from '@material-ui/icons/Add';
import ModalToolbar from '../../components/ModalToolbar';
import SolutionCreate from './create'

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function SolutionQuickCreateButton (props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const dispatch = useDispatch();
    const [newSolutionId, setNewSolutionId] = useState('');

    useEffect(() => {
        //Refresh the choices of the ReferenceInput to ensure our newly created post
        // always appear, even after selecting another post
        dispatch(
            crudGetMatching(
                "solutions",
                "symptoms@solutionId",
                { page: 1, perPage: 1000 },
                { field: "name", order: "ASC" },
                {}
            )
        );
    }, [dispatch, newSolutionId]);

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
    const handleSave = (values, redirect) => {
        create(
            {
                payload: {data:values},
            },
            {
                onSuccess: ({ data: newSolution }) => {
                    notify('New solution created', 'info', {});
                    closeModal();
                    setNewSolutionId(newSolution.id);
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
        <React.Fragment>
            <Button onClick={handleClickOpen} label="ra.action.create">
                <IconContentAdd />
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={maxWidth}
                open={open}
                onClose={handleCancel}
                aria-labelledby="create-solution-dialog-title"
            >
                <DialogTitle id="create-solution-dialog-title">New Solution</DialogTitle>
                <DialogContent>
                    <SolutionCreate basePath="/" resource="solutions" toolbar={<ModalToolbar handleCancel={handleCancel} handleSave={handleSave}/>}>
                    </SolutionCreate>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
