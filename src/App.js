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
import Button from "react-bootstrap/Button";
import {ButtonToolbar, Col, Container, Row, Stack} from "react-bootstrap";
import {Input} from "@styled-icons/material";
import Form from "react-bootstrap/Form";
import {appData} from "./model/appData";

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
    const [pagesData, setAppVal] = useState(appData["pagesData"]);

    // order matters, cannot contain duplicates
    const [pages, setPages] = useState(['1', '2'])

    const [currentPage, setCurrentPage] = useState(pagesData[0].pageId)

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

    const selectPage = (val) => {
        setCurrentPage(val)
    }

    const handlePageNameChange = (newName, currentPage) => {
        pagesData[newName] = pagesData[currentPage]
        deletePage(pagesData, setAppVal, currentPage, setCurrentPage)
        setCurrentPage(newName)
    }

    const pageButtons = () => {
        return pagesData.map((el) => (
                <ButtonToolbar>
                    <Button
                        key={el.pageId}
                        onMouseDown={() => selectPage(el.pageId)}
                        className={el.pageId === currentPage ? "btn-primary" : "btn-secondary"}
                    >
                        {el.pageName}
                    </Button>
                    <Button
                        key={'delete' + el.pageId}
                        onMouseDown={() => deletePage(pagesData, setAppVal, el.pageId, setCurrentPage)}
                        className={el.pageId === currentPage ? "btn-primary" : "btn-secondary"}
                    >
                        Trash
                    </Button>

                    <Form.Control
                        type="text"
                        value={el.pageName}
                        style={{cursor: 'pointer'}}
                        onChange={(e) => handlePageNameChange(e.target.value, currentPage)}
                    />
                </ButtonToolbar>
            )
        )
    }

    return (
        <Container>
            <Row>
                <Col lg={2}>
                    <Stack gap={3} className="sticky-top menu">
                        <AppToolbar
                            handlePrint={() => handleHTMLChange(currentPage)}
                            handleExport={() => handleExport(plugins, pagesData)}
                            handleAddPage={() => addPage(pagesData, setAppVal, initialValueBasicElements)}
                        />
                        {pageButtons()}
                    </Stack>
                </Col>
                <Col lg>
                    <div className="App">
                        <BallonToolbarMarks/>
                        <div className="sticky-top bg-white">
                            <HeadingToolbarMarks/>
                        </div>
                        <Plate id={"page" + currentPage} editableProps={editableProps}
                               initialValue={pagesData[0].nodes}
                               plugins={plugins}
                               components={components}
                               options={options}
                               onChange={(newV) => {
                                   setAppVal({
                                       ...pagesData,
                                       [currentPage]: newV
                                   })
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
