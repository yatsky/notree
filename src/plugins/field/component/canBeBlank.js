import React from "react";
import Form from "react-bootstrap/Form";

export const CanBeBlank = ({onCanBeBlankChange}) => {
    return <Form.Group controlId="field-blank">
        <Form.Label>Can this field be blank?</Form.Label>
        <Form.Control
            as="select"
            onChange={onCanBeBlankChange}
        >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </Form.Control>
    </Form.Group>
}
