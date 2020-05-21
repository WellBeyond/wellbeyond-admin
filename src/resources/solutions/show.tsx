import * as React from "react";

import {
    ArrayField,
    BooleanField,
    Datagrid,
    DateField,
    EditButton,
    ImageField,
    NumberField,
    ReferenceManyField,
    RichTextField,
    ShowController,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField
} from "react-admin";

const SolutionShow = (props: any) => (
    <ShowController {...props}>
        {(controllerProps: any) =>
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Summary">
                        <TextField source="id"/>
                        <TextField source="name"/>
                        <BooleanField source="isSystemProperty"/>
                        <RichTextField source="description"/>
                    </Tab>
                    <Tab label="Question">
                        <TextField source="questionType"/>
                        <TextField source="questionText"/>
                        {controllerProps.record && controllerProps.record.questionType === 'number' &&
                            <NumberField source="minValue" />
                        }
                        {controllerProps.record && controllerProps.record.questionType === 'number' &&
                            <NumberField source="maxValue" />
                        }
                        {controllerProps.record && (controllerProps.record.questionType === 'choose-one') &&
                            <ArrayField source="choices">
                                <Datagrid>
                                    <TextField source="value"/>
                                </Datagrid>
                            </ArrayField>
                        }
                        <RichTextField source="helpText"/>
                    </Tab>
                    <Tab label="Photos">
                        <ReferenceManyField
                            addlabel=''
                            reference="photos"
                            target="solutionId"
                            sort={{field: 'created_at', order: 'DESC'}}
                        >
                            <Datagrid>
                                <DateField source="createdate"/>
                                <TextField source="name"/>
                                <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                                <EditButton/>
                            </Datagrid>
                        </ReferenceManyField>
                    </Tab>
                    <Tab label="Videos">
                        <ReferenceManyField
                            addlabel=''
                            reference="videos"
                            target="solutionId"
                            sort={{field: 'created_at', order: 'DESC'}}
                        >
                            <Datagrid>
                                <DateField source="createdate"/>
                                <TextField source="name"/>
                                <ImageField source="data.thumbnail_url" label="Thumbnail"/>
                                <EditButton/>
                            </Datagrid>
                        </ReferenceManyField>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);

export default SolutionShow;