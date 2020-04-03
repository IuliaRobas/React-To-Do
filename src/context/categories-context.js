import React, { createContext, useContext } from "react";
import { useCategories } from "../hooks/index";

export const CategoriesContext = createContext();
export const CategoriesProvider = ({ children }) => {
  const { categories, setCategories } = useCategories();

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesValue = () => useContext(CategoriesContext);
