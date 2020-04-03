import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    SaveButton,
    Toolbar,
    useTranslate
} from 'react-admin';
import Button from '@material-ui/core/Button';
import IconCancel from '@material-ui/icons/Cancel';
import IconSave from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        margin: '10px 24px',
        position: 'relative',
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
    },
});

const ModalToolbar = props => {
    const sanitizeProps = ({ onSave, onCancel, ...props }) => props;
    const { onSave, onCancel, cancelLabel='ra.action.cancel' } = props;
    const translate = useTranslate();
    const classes = useStyles();

    const ModalSaveButton = props => {
        return props.handleSubmitWithRedirect ?
            <SaveButton {...props} onSave={onSave}/> :
            <Button className={classes.button} onClick={onSave} variant={'contained'} color={'primary'}>
                <IconSave className={classes.iconPaddingStyle} />
                {translate('ra.action.save')}
            </Button>;
    };

    const ModalCancelButton = props => {
        return (
            <Button className={classes.button} onClick={onCancel}>
                <IconCancel className={classes.iconPaddingStyle} />
                {translate('ra.action.cancel')}
            </Button>
        );
    };

    return (
        <Toolbar {...sanitizeProps(props)}>
            <ModalSaveButton />
            <ModalCancelButton />
        </Toolbar>
    );
};

ModalToolbar.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default ModalToolbar;