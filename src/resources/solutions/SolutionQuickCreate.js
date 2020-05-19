import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {BooleanInput, CREATE, showNotification, SimpleForm, TextInput,} from 'react-admin'; // eslint-disable-line import/no-unresolved
import ModalToolbar from '../../components/ModalToolbar';

const useStyles = makeStyles({
    form: { padding: 0 },
});

const SolutionQuickCreate = ({ onCancel, onSave, ...props }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const submitting = useSelector(state => state.admin.loading > 0);

    const handleSave = useCallback(
        values => {
            dispatch({
                type: 'QUICK_CREATE',
                payload: { data: values },
                meta: {
                    fetch: CREATE,
                    resource: 'Symptoms',
                    onSuccess: {
                        callback: ({ payload: { data } }) => onSave(data),
                    },
                    onFailure: {
                        callback: ({ error }) => {
                            dispatch(showNotification(error.message, 'error'));
                        },
                    },
                },
            });
        },
        [dispatch, onSave]
    );

    return (
        <SimpleForm
            save={handleSave}
            saving={submitting}
            redirect={false}
            toolbar={
                <ModalToolbar
                    onSave={handleSave}
                    onCancel={onCancel}
                    submitting={submitting}
                />
            }
            classes={{ form: classes.form }}
            {...props}
        >
            <TextInput source="name" fullWidth={true}/>
            <BooleanInput source="askAreYouAble" label="Ask if the user is able to perform the fix first"
                          fullWidth={true}/>
            <BooleanInput source="askForPhotoBefore" label="Ask for a before photo" fullWidth={true}/>
            <BooleanInput source="askForPhotoAfter" label="Ask for an after photo" fullWidth={true}/>
        </SimpleForm>
    );
};

SolutionQuickCreate.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default SolutionQuickCreate;
