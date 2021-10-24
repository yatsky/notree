import { ButtonToolbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { deletePage } from "./deletePage";
import Form from "react-bootstrap/Form";
import React from "react";

export const PageButtons = (
  handleAppDataChange,
  toggleNameReadOnly,
  handlePageNameChange,
  pageData,
  selectPage
) => {
  return (
    <ButtonToolbar>
      <Form.Control
        type="text"
        className={`
            ${!pageData.nameReadOnly ? "outline-primary" : ""}
            ${pageData.selected && pageData.nameReadOnly ? "bg-primary text-white" : ""}
        `}
        value={pageData.pageName}
        style={{ cursor: "pointer" }}
        onClick={() => selectPage(pageData.pageId)}
        onDoubleClick={() => {
          toggleNameReadOnly(pageData.pageId, false);
        }}
        onBlur={(e) => {
          handlePageNameChange(e.target.value);
          toggleNameReadOnly(pageData.pageId, true);
        }}
        onChange={(e) => {
          handlePageNameChange(e.target.value);
        }}
        readOnly={pageData.nameReadOnly}
      />

      <Button
        key={"delete" + pageData.pageId}
        onClick={() => deletePage(handleAppDataChange, pageData.pageId)}
        className={pageData.selected ? "btn-primary" : "btn-secondary"}
      >
        Trash
      </Button>
    </ButtonToolbar>
  );
};
