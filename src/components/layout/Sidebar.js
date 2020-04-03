import React, { useState } from "react";
import {
  FaChevronDown,
  FaExclamationCircle,
  FaRegCalendarAlt,
  FaRegCalendar
} from "react-icons/fa";

import { Categories } from "../Categories";
import { useSelectedCategoryValue } from "../../context/index";
import { AddCategory } from "../AddCategory";

export const Sidebar = () => {
  const { setSelectedCategory } = useSelectedCategoryValue();
  const [active, setActive] = useState("priorities");
  const [showCategories, setShowCategories] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="priorities"
          className={active === "priorities" ? "active" : undefined}
          onClick={() => {
            setActive("priorities");
            setSelectedCategory("PRIORITIES");
          }}
        >
          <div data-testid="priorities-action">
            <span>
              <FaExclamationCircle />
            </span>
            <span>Priorities</span>
          </div>
        </li>
        <li
          data-testid="today"
          className={active === "today" ? "active" : undefined}
          onClick={() => {
            setActive("today");
            setSelectedCategory("TODAY");
          }}
        >
          <div data-testid="today-action">
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="next_7"
          className={active === "next_7" ? "active" : undefined}
          onClick={() => {
            setActive("next_7");
            setSelectedCategory("NEXT_7");
          }}
        >
          <div data-testid="next_7-action">
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowCategories(!showCategories)}
      >
        <span>
          <FaChevronDown
            className={!showCategories ? "hidden-categories" : undefined}
          />
        </span>
        <h2>Categories</h2>
      </div>

      <ul className="sidebar__categories">
        {showCategories && <Categories />}
      </ul>
      {showCategories && <AddCategory />}
    </div>
  );
};
