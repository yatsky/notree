import React from 'react';
import Form from "react-bootstrap/Form";

export const Label = ({onLabelChange}) => {
    return <Form.Group controlId="field-label">
        <Form.Label>Field label</Form.Label>
        <Form.Control
            as="textarea"
            rows={1}
            onChange={onLabelChange}
        />
    </Form.Group>
}
