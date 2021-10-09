import React, {useState} from 'react';
import {createEditorPlugins, createPlateComponents, createPlateOptions, Plate} from '@udecode/plate';
import {initialValueBasicElements, pluginsBasic} from './plugins/pluginsBasic'
import {FIELD} from "./plugins/field/defaults";
import {FieldElement} from "./plugins/field/component/fieldElement";
import {createFieldPlugin} from "./plugins/field/utils/createFieldPlugin";
import {AppToolbar, BallonToolbarMarks, HeadingToolbarMarks} from "./toolbar/toolbar";
import {MARK_BG_COLOR, MARK_COLOR, MARK_FONT_SIZE} from "@udecode/plate-font";
import {StyledLeaf, withStyledProps} from "@udecode/plate-styled-components";
import {serializeHTMLFromNodes} from "@udecode/plate-html-serializer";
import {handleExport} from "./utils/export";
import {addPage} from "./toolbar/page/addPage";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row, Stack} from "react-bootstrap";
import {PageButtons} from "./toolbar/page/pageButton";
import {v4 as uuidv4} from "uuid";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {reorder} from "./toolbar/page/utils";
import {loadAppDataLocal} from "./utils/appData";
import Amplify from "aws-amplify";
import awsconfig from './aws-exports'
import {AmplifyAuthenticator, AmplifySignOut, AmplifySignUp} from "@aws-amplify/ui-react";
import {onAuthUIStateChange} from "@aws-amplify/ui-components";

Amplify.configure(awsconfig)

const baseComponents = createPlateComponents();
const options = createPlateOptions();

const components = {
    ...baseComponents,
    [FIELD]: FieldElement,
    [MARK_COLOR]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_COLOR]: ['color'],
        },
    }),
    [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_BG_COLOR]: ['backgroundColor'],
        },
    }),
    [MARK_FONT_SIZE]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_FONT_SIZE]: ['fontSize'],
        },
    }),

}

const plugins = [
    ...pluginsBasic,
    createFieldPlugin(),
]

function App() {
    const [htmlVal, setHTMLVal] = useState(null);
    const [appData, setAppData] = useState(loadAppDataLocal('content'));
    const {pagesData} = appData

    //authentication
    const [authState, setAuthState] = useState()
    const [user, setUser] = useState()

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState)
            setUser(authData)
        })
    }, [])

    const toggleNameReadOnly = (pageId, val) => {
        let newPagesData
        newPagesData = pagesData.map(pageData => pageData.pageId === pageId ? {
            ...pageData,
            nameReadOnly: val
        } : pageData)
        setAppData(
            {
                ...appData,
                "pagesData": newPagesData
            }
        )
    }
    const handleAppDataChange = (op, nodes, pageId = "") => {
        const {pagesData} = appData
        let newPagesData
        if (op === "U") {
            newPagesData = pagesData.map(pageData => pageData.selected ? {...pageData, "nodes": nodes} : pageData)
        } else if (op === "C") {
            newPagesData = [
                ...pagesData,
                {
                    "pageId": uuidv4(),
                    "pageName": "New page",
                    "selected": false,
                    "deleted": false,
                    "nameReadOnly": true,
                    "nodes": initialValueBasicElements,
                },
            ]
        } else if (op === "D") {
            newPagesData = pagesData.map(pageData => {
                return {...pageData, "deleted": pageData.pageId === pageId}
            })
            newPagesData[0].selected = true
        }
        setAppData(
            {
                ...appData,
                "pagesData": newPagesData
            }
        )
    }

    const editableProps = {
        placeholder: 'Type...,',
        style: {
            padding: '15px'
        }
    }
    const handleHTMLChange = (pageId) => {
        const pageData = pagesData.find((pageData) => pageData.pageId === pageId)
        setHTMLVal(serializeHTMLFromNodes(createEditorPlugins(plugins), {
            plugins: plugins, nodes:
            pageData.nodes,
            preserveClassNames: ["slate-", "notree-"]
        }))
    }

    const selectPage = (pageId) => {
        const newPagesData = pagesData.map(pageData => {
            return {...pageData, "selected": pageData.pageId === pageId}
        })
        console.log(newPagesData)
        setAppData(
            {
                ...appData,
                "pagesData": newPagesData
            }
        )
    }

    const handlePageNameChange = (newName) => {
        const newPagesData = pagesData.map(pageData => {
            return pageData.selected ? {...pageData, "pageName": newName} : pageData
        })
        setAppData(
            {
                ...appData,
                "pagesData": newPagesData
            }
        )
    }

    const pageButtonsGroup = (provided) => {
        return pagesData.map((el, index) => (
                !el.deleted ? (
                    <Draggable key={el.pageId} draggableId={el.pageId} index={index}>
                        {(provided) => <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {PageButtons(handleAppDataChange,
                                toggleNameReadOnly, handlePageNameChange, el, selectPage)}
                        </div>}
                    </Draggable>
                ) : <></>
            )
        )
    }
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            pagesData,
            result.source.index,
            result.destination.index
        );

        setAppData(
            {
                ...appData,
                "pagesData": items
            }
        )
    }
    return (

        /*https://github.com/aws-amplify/amplify-js/issues/1203#issuecomment-626062527*/
        <AmplifyAuthenticator
        >
            <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[{type: 'email'}, {type: 'password'}]}
            />

            <AmplifySignOut/>
            <Container>
                <Row>
                    <Col lg={2}>
                        <Stack gap={3} className="sticky-top menu">
                            <AppToolbar
                                handleExport={() => handleExport(plugins, pagesData)}
                                handleAddPage={() => addPage(pagesData, handleAppDataChange, initialValueBasicElements)}
                                appData={appData}
                            />
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="buttons-background">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {pageButtonsGroup(provided)}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Stack>
                    </Col>
                    <Col lg>
                        <div className="App">
                            <BallonToolbarMarks/>
                            <div className="sticky-top bg-white">
                                <HeadingToolbarMarks/>
                            </div>
                            <Plate id={pagesData.filter(pageData => pageData.selected)[0].pageId}
                                   editableProps={editableProps}
                                   initialValue={pagesData.filter(pageData => pageData.selected)[0].nodes}
                                   value={pagesData.filter(pageData => pageData.selected)[0].nodes}
                                   plugins={plugins}
                                   components={components}
                                   options={options}
                                   onChange={(newV) => {
                                       handleAppDataChange("U", newV)
                                   }}
                            >

                                {htmlVal}
                                <br/>
                            </Plate>
                        </div>
                    </Col>
                </Row>
            </Container>
        </AmplifyAuthenticator>
    );
}

export default App;
