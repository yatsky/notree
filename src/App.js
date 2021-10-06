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
    const [appVal, setAppVal] = useState({
        '1': initialValueBasicElements,
        '2': initialValueBasicElements,
    });
    const [currentPage, setCurrentPage] = useState('1')

    const editableProps = {
        placeholder: 'Type...,',
        style: {
            padding: '15px'
        }
    }
    const handleHTMLChange = (pageId) => setHTMLVal(serializeHTMLFromNodes(createEditorPlugins(plugins), {
        plugins: plugins, nodes:
            appVal[pageId],
        preserveClassNames: ["slate-", "notree-"]
    }))

    const selectPage = (val) => {
        setCurrentPage(val)
    }
    const pageButtons = () => {
        return Object.keys(appVal).map((el) => (
                <ButtonToolbar>
                    <Button
                        key={el}
                        onMouseDown={() => selectPage(el)}
                    >
                        Page {el}
                    </Button>
                    <Button
                        key={'delete' + el}
                        onMouseDown={() => deletePage(appVal, setAppVal, el, setCurrentPage)}
                    >
                        Trash
                    </Button>
                </ButtonToolbar>
            )
        )
    }

    return (
        <Container>
            <Row className="align-items-center">
                <Col lg={2}>
                    <Stack gap={3}>
                        <AppToolbar
                            handlePrint={() => handleHTMLChange(currentPage)}
                            handleExport={() => handleExport(plugins, appVal)}
                            handleAddPage={() => addPage(appVal, setAppVal, initialValueBasicElements)}
                        />
                        {pageButtons()}
                    </Stack>
                </Col>
                <Col lg>
                    <div className="App">
                        <BallonToolbarMarks/>
                        <HeadingToolbarMarks/>
                        <Plate id={"page" + currentPage} editableProps={editableProps}
                               initialValue={appVal[currentPage]}
                               plugins={plugins}
                               components={components}
                               options={options}
                               onChange={(newV) => {
                                   setAppVal({
                                       ...appVal,
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
