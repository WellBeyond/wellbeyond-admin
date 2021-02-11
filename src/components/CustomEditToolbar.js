import React from 'react';
import {DeleteButton, SaveButton, Toolbar} from 'react-admin';
import Grid from '@material-ui/core/Grid';
import IconSave from '@material-ui/icons/Save';
import IconSaveAlt from '@material-ui/icons/SaveAlt';


const valueOrDefault = (value, defaultValue) =>
  typeof value === 'undefined' ? defaultValue : value;

const CustomEditToolbar = props => {
  const {
    alwaysEnableSaveButton,
    basePath,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable,
  } = props;

  // Use form pristine to enable or disable the save button
  // if alwaysEnableSaveButton is undefined
  const disabled = !valueOrDefault(alwaysEnableSaveButton, !pristine);

  return (
    <Toolbar {...props}>
        <Grid container directon="row" justify="flex-start" spacing={2}>
          <Grid item>
            <SaveButton
              handleSubmitWithRedirect={
                handleSubmitWithRedirect || handleSubmit
              }
              invalid={invalid}
              disabled={disabled}
              redirect={false}
              saving={saving}
              submitOnEnter={submitOnEnter}
              icon={<IconSave />}
              label="Save" />
          </Grid>
          <Grid item>
            <SaveButton
              handleSubmitWithRedirect={
                handleSubmitWithRedirect || handleSubmit
              }
              invalid={invalid}
              disabled={disabled}
              redirect={redirect}
              saving={saving}
              submitOnEnter={submitOnEnter}
              icon={<IconSaveAlt />}
              label="Save and Exit"/>
          </Grid>
        </Grid>
        <DeleteButton
          basePath={basePath}
          record={record}
          resource={resource}
          undoable={undoable}/>
    </Toolbar>
  );
};

CustomEditToolbar.propTypes = {
};

export default CustomEditToolbar;