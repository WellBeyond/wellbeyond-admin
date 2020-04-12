import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  DeleteButton,
  SaveButton,
  Toolbar,
  useTranslate
} from 'react-admin';
import Grid from '@material-ui/core/Grid';
import IconSave from '@material-ui/icons/Save';
import IconSaveAlt from '@material-ui/icons/SaveAlt';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  theme => ({
    defaultToolbar: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttonGroup: {

    }
  })
);

const CustomEditToolbar = props => {
  const classes = useStyles(props);
  const translate = useTranslate();
  const {
    basePath,
    children,
    className,
    classes: classesOverride,
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
    width,
    ...rest
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