import React from "react";
import PropTypes from "prop-types";
import { useCategoriesValue } from "../context";
import { FaTrashAlt } from "react-icons/fa";

export const CategoryOverlay = ({
  setCategory,
  showCategoryOverlay,
  setShowCategoryOverlay
}) => {
  const { categories } = useCategoriesValue();

  return (
    categories &&
    showCategoryOverlay && (
      <div className="category-overlay" data-testid="category-overlay">
        <ul className="category-overlay__list">
          {categories.map(category => (
            <li key={category.categoryId}>
              <div
                data-testid="category-overlay-action"
                onClick={() => {
                  setCategory(category.categoryId);
                  setShowCategoryOverlay(false);
                }}
                onKeyDown={() => {
                  setCategory(category.categoryId);
                  setShowCategoryOverlay(false);
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task category"
              >
                {category.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

CategoryOverlay.propTypes = {
  categories: PropTypes.array
};
