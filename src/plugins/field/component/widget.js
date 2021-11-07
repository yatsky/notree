import React from "react";
import { WidgetOptions } from "../model/fieldModel";
import Form from "react-bootstrap/Form";

export const Widget = ({ widget, onWidgetChange }) => {
  const opts = WidgetOptions.map((opt, idx) => {
    return (
      <option key={idx} value={opt}>
        {opt}
      </option>
    );
  });
  return (
    <Form.Group controlId="field-widget">
      <Form.Label>Field widget</Form.Label>
      <Form.Control as="select" value={widget} onChange={onWidgetChange}>
        {opts}
      </Form.Control>
    </Form.Group>
  );
};
