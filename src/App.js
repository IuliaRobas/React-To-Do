import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { CategoriesProvider, SelectedCategoryProvider } from "./context";

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  return (
    <SelectedCategoryProvider>
      <CategoriesProvider>
        <main
          data-testid="application"
          className={darkMode ? "darkmode" : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </CategoriesProvider>
    </SelectedCategoryProvider>
  );
};
