import React from 'react';
import {DeleteButton, SaveButton, Toolbar} from 'react-admin';
import Grid from '@material-ui/core/Grid';
import IconSave from '@material-ui/icons/Save';
import IconSaveAlt from '@material-ui/icons/SaveAlt';

const CustomEditToolbar = props => {
  const {
    basePath,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable,
  } = props;

  return (
    <Toolbar {...props}>
        <Grid container directon="row" justify="flex-start" spacing={2}>
          <Grid item>
            <SaveButton
              handleSubmitWithRedirect={
                handleSubmitWithRedirect || handleSubmit
              }
              invalid={invalid}
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