import {ButtonToolbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {deletePage} from "./deletePage";
import Form from "react-bootstrap/Form";
import React from "react";

export const pageButtons = (pagesData, handleAppDataChange, handlePageNameChange, pageData, selectPage) => {
   return <ButtonToolbar>
      <Form.Control
          type="text"
          value={pageData.pageName}
          style={{cursor: 'pointer'}}
          onMouseDown={() => selectPage(pageData.pageId)}
          readOnly={true}
      />

      <Button
          key={'delete' + pageData.pageId}
          onMouseDown={() => deletePage(pagesData, handleAppDataChange, pageData.pageId)}
          className={pageData.selected ? "btn-primary" : "btn-secondary"}
      >
         Trash
      </Button>
   </ButtonToolbar>
}