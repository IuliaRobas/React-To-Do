import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCategoriesValue, useSelectedCategoryValue } from "../context";
import { firebase } from "../firebase";

export const IndividualCategory = ({ category }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { categories, setCategories } = useCategoriesValue();
  const { setSelectedCategory } = useSelectedCategoryValue();

  const deleteCategory = docId => {
    firebase
      .firestore()
      .collection("categories")
      .doc(docId)
      .delete()
      .then(() => {
        setCategories([...categories]);
        setSelectedCategory("PRIORITIES");
      });
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__category-name">{category.name}</span>
      <span
        className="sidebar__category-delete"
        data-testid="delete-category"
        onClick={() =>
          //setShowConfirm(!showConfirm)
          deleteCategory(category.docId)
        }
      >
        <FaTrashAlt />
      </span>
    </>
  );
};

IndividualCategory.propTypes = {
  category: PropTypes.object.isRequired
};
