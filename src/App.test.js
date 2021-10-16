import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

test("renders learn react link", async () => {
  await act(async () => render(<App />));
  const linkElement = screen.getByText(/Publish/i);
  expect(linkElement).toBeInTheDocument();
});
