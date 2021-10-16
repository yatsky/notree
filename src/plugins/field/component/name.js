import React from "react";
import Form from "react-bootstrap/Form";

export const Name = ({ name, onNameChange }) => {
  return (
    <div>
      <Form.Group controlId="field-name">
        <Form.Label>Field name</Form.Label>
        <Form.Control type="text" value={name} onChange={onNameChange} />
      </Form.Group>
    </div>
  );
};
