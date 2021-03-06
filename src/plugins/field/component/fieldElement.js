import React, { useState } from "react";
import { useEditorRef } from "@udecode/plate-core";
import { ReactEditor } from "slate-react";
import { setNodes } from "@udecode/plate-common";
import { Model } from "./model";
import { FieldType } from "./fieldType";
import { CanBeBlank } from "./canBeBlank";
import { Widget } from "./widget";
import { Name } from "./name";
import { Label } from "./label";
import { Doc } from "./doc";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Menu, X } from "@styled-icons/boxicons-regular";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "../fieldElement.css";
import Col from "react-bootstrap/Col";
import { Choices } from "./choices";

export const FieldElement = (props) => {
  // https://docs.slatejs.org/concepts/09-rendering
  const { attributes, children, element } = props;
  const editor = useEditorRef();
  const [fieldHidden, setFieldHidden] = useState(true);

  const isValidName = (val) => {
    return !val.includes(" ");
  };
  const onNameChange = (e) => {
    let val = e.target.value;
    if (isValidName(val)) {
      const path = ReactEditor.findPath(editor, element);
      setNodes(editor, { name: val }, { at: path });
    } else {
      alert("White space is not allowed here");
    }
  };
  const onModelChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { model: val }, { at: path });
  };

  const onFieldTypeChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { fieldType: val }, { at: path });
  };
  const onCanBeBlankChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { canBeBlank: val }, { at: path });
  };
  const onWidgetChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { widget: val }, { at: path });
  };
  const onLabelChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { label: val }, { at: path });
  };
  const onChoicesChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { choices: val }, { at: path });
  };
  const onDocChange = (e) => {
    let val = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    setNodes(editor, { doc: val }, { at: path });
  };

  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes} contentEditable={false} className="container">
      <div style={{ boxShadow: "0 0 0 3px #ddd", padding: "8px" }}>
        <div className="text-end menu-button">
          <Button
            onClick={() => setFieldHidden(!fieldHidden)}
            size="sm"
            active={!fieldHidden}
          >
            {fieldHidden ? <Menu size="100%" /> : <X size="100%" />}
          </Button>
        </div>
        <Form>
          <Row className={fieldHidden ? "hide" : ""}>
            <Col>
              <Name name={element.name} onNameChange={onNameChange} />
              <Label label={element.label} onLabelChange={onLabelChange} />
              <Model onModelChange={onModelChange} />
              <FieldType
                fieldType={element.fieldType}
                onFieldTypeChange={onFieldTypeChange}
              />
            </Col>
            <Col>
              <Choices
                choices={element.choices}
                onChoicesChange={onChoicesChange}
              />
              <CanBeBlank onCanBeBlankChange={onCanBeBlankChange} />
              <Widget widget={element.widget} onWidgetChange={onWidgetChange} />
              <Doc onDocChange={onDocChange} />
            </Col>
          </Row>
          <Row className="field-preview">
            <Col className="col-4">
              <h5>Preview of field:</h5>
              <pre>{element.name}</pre>
            </Col>
            <Col>
              <Form.Group controlId="field-preview">
                <Form.Label>{element.label}</Form.Label>
                <Form.Control style={{ width: "40%" }} type="text" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      {children}
    </div>
  );
};
