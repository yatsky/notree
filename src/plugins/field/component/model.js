import React from "react";
import {ModelOptions} from "../model/fieldModel";
import Form from "react-bootstrap/Form";

export const Model = ({onModelChange}) => {
    const opts = ModelOptions.map((opt, idx) => {
        return (
            <option key={idx} value={opt}>
                {opt}
            </option>
        )
    })
    return <Form.Group controlId="field-model">
            <Form.Label>Field model</Form.Label>
            <Form.Control
                as="select"
                onChange={onModelChange}
            >
                {opts}
            </Form.Control>
    </Form.Group>
}

