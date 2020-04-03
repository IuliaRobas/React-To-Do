import React, { useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedCategoryValue, useCategoriesValue } from "../context";
import { AddTask } from "./AddTask";
import {
  FaEllipsisH,
  FaEdit,
  FaGripVertical,
  FaRegCommentAlt,
  FaExclamation
} from "react-icons/fa";
export const Tasks = () => {
  const { selectedCategory } = useSelectedCategoryValue();
  const { categories } = useCategoriesValue();
  const { tasks } = useTasks(selectedCategory);

  let categoryName = "";

  if (categories && selectedCategory && !collatedTasksExist(selectedCategory)) {
    categoryName = getTitle(categories, selectedCategory).name;
  }

  if (collatedTasksExist(selectedCategory) && selectedCategory) {
    categoryName = getCollatedTitle(collatedTasks, selectedCategory).name;
  }

  useEffect(() => {
    document.title = `${categoryName}: To Do`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 className="tasks__category-name" data-testid="category-name">
        {categoryName}
      </h2>
      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <span className="tasks__task-edit">
              <FaGripVertical />
            </span>
            <Checkbox id={task.id} />
            <span className="tasks__task">{task.task}</span>

            <span className="tasks__task-right">
              <div>
                <FaExclamation />
              </div>
              <div>
                <FaRegCommentAlt />
              </div>
              <div>
                <FaEllipsisH />
              </div>
            </span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
