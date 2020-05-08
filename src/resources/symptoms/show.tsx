import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    ShowController,
    ShowView,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    TextField,
    BooleanField,
    ArrayField,
    NumberField,
    EditButton,
    RichTextField,
    DateField,
    ImageField
} from "react-admin";

const SymptomShow = (props: any) => (
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
                            addLabel={false}
                            reference="photos"
                            target="symptomId"
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
                            addLabel={false}
                            reference="videos"
                            target="symptomId"
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

export default SymptomShow;