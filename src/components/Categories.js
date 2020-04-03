import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelectedCategoryValue, useCategoriesValue } from "../context";
import { IndividualCategory } from "./IndividualCategory";

export const Categories = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedCategory } = useSelectedCategoryValue();
  const { categories } = useCategoriesValue();

  return (
    categories &&
    categories.map(category => (
      <li
        key={category.categoryId}
        data-testid="category-action-parent"
        data-doc-id={category.docId}
        className={
          active === category.categoryId
            ? "active sidebar__category"
            : "sidebar__category"
        }
        onClick={() => {
          setActive(category.categoryId);
          setSelectedCategory(category.categoryId);
        }}
        onKeyDown={() => {
          setActive(category.categoryId);
          setSelectedCategory(category.categoryId);
        }}
      >
        <IndividualCategory category={category} />
      </li>
    ))
  );
};

Categories.propTypes = {
  activeValue: PropTypes.bool
};
