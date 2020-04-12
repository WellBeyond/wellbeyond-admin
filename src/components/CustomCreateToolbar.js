import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  ListButton,
  SaveButton,
  Toolbar,
  useTranslate
} from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  theme => ({
    defaultToolbar: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

const CustomCreateToolbar = props => {
  const classes = useStyles(props);
  const translate = useTranslate();
  const sanitizeProps = ({ cancelLabel, ...props }) => props;
  const {cancelLabel='ra.action.cancel' } = props;

  return (
    <Toolbar {...sanitizeProps(props)}>
      <div className={classes.defaultToolbar}>
        <SaveButton {...sanitizeProps(props)}/>
        <ListButton {...sanitizeProps(props)} icon={<IconCancel />} label={cancelLabel} />
      </div>
    </Toolbar>
  );
};

CustomCreateToolbar.propTypes = {
  cancelLabel: PropTypes.string
};

export default CustomCreateToolbar;