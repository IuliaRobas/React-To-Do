import React, { useState } from "react";
import { firebase } from "../firebase";
import { generatePushId } from "../helpers";
import { useCategoriesValue } from "../context";

export const AddCategory = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [categoryName, setCategoryName] = useState("");

  const categoryId = generatePushId();
  const { setCategories } = useCategoriesValue();

  const addCategory = () =>
    categoryName &&
    firebase
      .firestore()
      .collection("categories")
      .add({ categoryId, name: categoryName, userId: "LAUlGBCzvpgyI44H01eb" })
      .then(() => {
        setCategories([]);
        setCategoryName("");
        setShow(false);
      });

  return (
    <div className="add-category" data-testid="add-category">
      {show && (
        <div className="add-category__input">
          <input
            value={categoryName}
            onKeyDown={e => {
              if (e.key === "Enter") {
                addCategory();
              }
            }}
            onChange={e => {
              setCategoryName(e.target.value);
            }}
            className="add-category__name"
            data-testid="category-name"
            type="text"
            placeholder="Name your category"
          />
          <button
            className="add-category__submit"
            type="button"
            onClick={() => addCategory()}
            data-testid="add-category-submit"
          >
            Add Category
          </button>
          <span
            data-testid="hide-category-overlay"
            className="add-category__cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-category__plus">+</span>
      <span
        data-testid="add-category-action"
        className="add-category__text"
        onClick={() => setShow(!show)}
      >
        Add Category
      </span>
    </div>
  );
};
