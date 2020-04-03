import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import { Checkbox } from "../components/Checkbox";

beforeEach(cleanup);

jest.mock("../firebase.js", () => ({
  firebase: {
    firestore: jest.fn(() => {
      collection: jest.fn(() => ({
        update: jest.fn()
      }));
    })
  }
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders the task checkbox", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDescription="Finish this.." />
      );
      expect(queryByTestId("checkbox-actidasdason")).toBeTruthy();
    });

    it("renders the task checkbox and accepts a click", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDescription="Finish this.." />
      );
      expect(queryByTestId("checkbox-actidasdason")).toBeTruthy();
      fireEvent.click(queryByTestId("checkbox-action"));
    });
  });
});
