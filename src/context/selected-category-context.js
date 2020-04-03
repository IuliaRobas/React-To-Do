import React, { createContext, useContext, useState } from "react";
import { useCategories } from "../hooks/index";

export const SelectedCategoryContext = createContext();
export const SelectedCategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("PRIORITIES");
  return (
    <SelectedCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};

export const useSelectedCategoryValue = () =>
  useContext(SelectedCategoryContext);
