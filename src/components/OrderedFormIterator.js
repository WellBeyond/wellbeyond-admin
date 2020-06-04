import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import DraggableFormInput from './DraggableFormInput';

const sanitizeProps = ({ classes, ...props }) => props;

const styles = theme => ({
    root: {
        padding: 0,
        marginBottom: 0,
        '& > li:last-child': {
            borderBottom: 'none',
        },
    },
    line: {
        display: 'flex',
        listStyleType: 'none',
        borderBottom: `solid 1px ${theme.palette.divider}`,
        [theme.breakpoints.down('xs')]: { display: 'block' },
        '&.fade-enter': {
            opacity: 0.01,
            transform: 'translateX(100vw)',
        },
        '&.fade-enter-active': {
            opacity: 1,
            transform: 'translateX(0)',
            transition: 'all 500ms ease-in',
        },
        '&.fade-exit': {
            opacity: 1,
            transform: 'translateX(0)',
        },
        '&.fade-exit-active': {
            opacity: 0.01,
            transform: 'translateX(100vw)',
            transition: 'all 500ms ease-in',
        },
    },
    form: { flex: 2 },
    action: {
        paddingTop: '0.5em',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
});

export class OrderedFormIterator extends Component {
    constructor(props) {
        super(props);
        // we need a unique id for each field for a proper enter/exit animation
        // but redux-form doesn't provide one (cf https://github.com/erikras/redux-form/issues/2735)
        // so we keep an internal map between the field position and an autoincrement id
        this.nextId = 0;
        this.fieldName = props.fields.name;
        this.ids = props.fields ? props.fields.map(() => this.fieldName + '-' + this.nextId++) : [];
        this.record = props.record;
    }

    removeField = index => () => {
        const { fields } = this.props;
        this.ids.splice(index, 1);
        fields.remove(index);
    };

    addEmptyField = () => {
        this.addField({});
    };

    addField = (field) => {
        const { fields } = this.props;
        this.ids.push(this.fieldName + '-' + this.nextId++);
        fields.push(field || {});
    };

    getExistingFields = () => {
        const { fields } = this.props;
        return fields.value;
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        const { fields } = this.props;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        const [removed] = this.ids.splice(startIndex, 1);
        this.ids.splice(endIndex, 0, removed);
        fields.move(startIndex, endIndex);
    };

    render() {
        const {
            classes = {},
            fields,
            addButton,
            meta: { error, submitFailed }
        } = this.props;

        return fields ? (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {provided => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef} className={classes.root}>
                            {submitFailed && error && <span>{error}</span>}
                            <TransitionGroup>
                                {fields.map((member, index) => (
                                    <CSSTransition
                                        key={this.ids[index]+'-css'}
                                        timeout={500}
                                        classNames="fade"
                                    >
                                        <DraggableFormInput
                                            key={this.ids[index]+'-draggable'}
                                            id={this.ids[index]}
                                            index={index}
                                            member={member}
                                            onRemove={this.removeField}
                                            {...sanitizeProps(this.props)}
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                            {provided.placeholder}
                            <div className={classes.line}>
                                <span className={classes.action}>
                                    {addButton ?
                                    React.cloneElement(addButton, {
                                        getExistingFields: this.getExistingFields,
                                        addField: this.addField,
                                        record: this.record,
                                        //  Ensure we don't override any user provided props
                                        ...addButton.props,
                                    }) :
                                        <Button
                                            size="small"
                                            onClick={this.addEmptyField}
                                        >
                                            <AddIcon className={classes.leftIcon} />
                                            Add
                                        </Button>
                                    }
                                </span>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        ) : null;
    }
}

OrderedFormIterator.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    fields: PropTypes.object,
    meta: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    addField: PropTypes.func,
    addButton: PropTypes.element
};

export default compose(withStyles(styles))(OrderedFormIterator);