import React from 'react';
import Form from "react-bootstrap/Form";

export const Doc = ({onDocChange}) => {
    return <Form.Group controlId="field-doc">
        <Form.Label>Field documentation</Form.Label>
        <Form.Control as="textarea" rows={1} onChange={onDocChange} />
    </Form.Group>
}
