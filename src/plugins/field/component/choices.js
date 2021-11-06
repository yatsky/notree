import React from "react";
import Form from "react-bootstrap/Form";

export const Choices = ({ choices, onChoicesChange }) => {
  return (
    <Form.Group controlId="field-choices">
      <Form.Label>Field choices</Form.Label>
      <Form.Control
        as="textarea"
        rows={1}
        value={choices}
        onChange={onChoicesChange}
      />
    </Form.Group>
  );
};
