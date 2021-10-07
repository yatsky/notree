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
import {deletePage} from "./toolbar/page/deletePage";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row, Stack} from "react-bootstrap";
import {initialAppData} from "./model/initialAppData";
import {pageButtons} from "./toolbar/page/pageButton";
import {v4 as uuidv4} from "uuid";
import {useEditorRef} from "@udecode/plate-core";

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
    const [appData, setAppData] = useState(initialAppData);
    const {pagesData} = appData
    const handleAppDataChange = (op, nodes) => {
        const {pagesData} = appData
        let newPagesData
        if (op === "U") {
            newPagesData = pagesData.map(pageData => pageData.selected ? {...pageData, "nodes": nodes}: pageData)
        }
        else if (op === "C") {
            newPagesData = [
                ...pagesData,
                {
                    "pageId": uuidv4(),
                    "pageName": "New page",
                    "nodes": initialValueBasicElements,
                },
            ]
        }
        else if (op === "D") {
            newPagesData = pagesData.filter(pageData => !pageData.selected)[0]
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
        const newPagesData = pagesData.map(pageData => {return {...pageData, "selected": pageData.pageId === pageId}})
        setAppData(
            {
                ...appData,
                "pagesData": newPagesData
            }
        )
    }

    const handlePageNameChange = (newName) => {
        const pageData = pagesData.find((pageData) => pageData.selected)[0].pageName
    }

    const pageButtonsGroup = () => {
        return pagesData.map((el) => (
                pageButtons(pagesData, handleAppDataChange,
                    handlePageNameChange, el, selectPage)
            )
        )
    }

    return (
        <Container>
            <Row>
                <Col lg={2}>
                    <Stack gap={3} className="sticky-top menu">
                        <AppToolbar
                            handleExport={() => handleExport(plugins, pagesData)}
                            handleAddPage={() => addPage(pagesData, handleAppDataChange, initialValueBasicElements)}
                        />
                        {pageButtonsGroup()}
                    </Stack>
                </Col>
                <Col lg>
                    <div className="App">
                        <BallonToolbarMarks/>
                        <div className="sticky-top bg-white">
                            <HeadingToolbarMarks/>
                        </div>
                        <Plate id={pagesData.filter(pageData => pageData.selected)[0].pageId} editableProps={editableProps}
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
    );
}

export default App;
