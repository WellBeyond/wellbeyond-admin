import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-admin';
import {FieldProps, fieldPropTypes, InjectedFieldProps} from './types';
import AddIcon from '@material-ui/icons/AddCircleOutline';

interface Props extends FieldProps {
    parent: string;
    child: string;
}

export const AddChildButton: FunctionComponent<Props & InjectedFieldProps> = ({
                                                                                  record = {},
                                                                                  parent,
                                                                                  child,
                                                                                  ...rest
                                                                              }) => {
    let url:string = '/' + child + 's/create?' + parent +'Id=' + record.id;
    let buttonText:string = 'Add a ' + child;
    return (
        <Button
            variant="contained"
            component={Link}
            to={url}
            title={buttonText}
            label={buttonText}
        >
            <AddIcon />
        </Button>
    );
};

AddChildButton.propTypes = {
    ...fieldPropTypes
};
