import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import PropTypes from "prop-types";
import { firebase } from "../firebase";
import { useSelectedCategoryValue } from "../context";
import { CategoryOverlay } from "./CategoryOverlay";
import { TaskDate } from "./TaskDate";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [category, setCategory] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedCategory } = useSelectedCategoryValue();

  const addTask = () => {
    const categoryId = category || selectedCategory;

    let collatedDate = "";

    if (categoryId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (categoryId === "NEXT_7") {
      collatedDate = moment()
        .add(7, "days")
        .format("DD/MM/YYYY");
    }

    return (
      task &&
      categoryId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          categoryId,
          task,
          date: collatedDate || taskDate,
          userId: "LAUlGBCzvpgyI44H01eb"
        })
        .then(() => {
          setTask("");
          setCategory("");
          setShowMain("");
          setShowCategoryOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={() => setShowMain(!showMain)}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowCategoryOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={() => {
                    setShowMain(false);
                    setShowCategoryOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <CategoryOverlay
            setCategory={setCategory}
            showCategoryOverlay={showCategoryOverlay}
            setShowCategoryOverlay={setShowCategoryOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowCategoryOverlay(false);
              }}
              onKeyDown={() => {
                setShowMain(false);
                setShowCategoryOverlay(false);
              }}
              aria-label="Cancel adding a task"
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__category"
            data-testid="show-category-overlay"
            onClick={() => {
              setShowCategoryOverlay(!showCategoryOverlay);
              setShowTaskDate(false);
            }}
            onKeyDown={() => {
              setShowCategoryOverlay(!showCategoryOverlay);
              setShowTaskDate(false);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => {
              setShowTaskDate(!showTaskDate);
              setShowCategoryOverlay(false);
            }}
            onKeyDown={() => {
              setShowTaskDate(!showTaskDate);
              setShowCategoryOverlay(false);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func
};
