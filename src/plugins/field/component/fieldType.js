import React from "react";
import {FieldTypeOptions} from "../model/fieldModel";
import Form from "react-bootstrap/Form";

export const FieldType = ({onFieldTypeChange}) => {
    const opts =  FieldTypeOptions.map((opt, idx) => {
        return (
            <option key={idx} value={opt}>
                {opt}
            </option>
        )
    })
    return <Form.Group controlId="field-type">
        <Form.Label>Field type</Form.Label>
        <Form.Control as="select"  onChange={onFieldTypeChange}>
            {opts}
        </Form.Control>
    </Form.Group>
}
