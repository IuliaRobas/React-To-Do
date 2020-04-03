/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";

export const useTasks = selectedCategory => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "LAUlGBCzvpgyI44H01eb");

    unsubscribe =
      selectedCategory && !collatedTasksExist(selectedCategory)
        ? (unsubscribe = unsubscribe.where(
            "categoryId",
            "==",
            selectedCategory
          ))
        : selectedCategory === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedCategory === "PRIORITIES" || selectedCategory === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      setTasks(
        selectedCategory === "NEXT_7"
          ? newTasks.filter(
              task =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedCategory]);

  return { tasks, archivedTasks };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("categories")
      .where("userId", "==", "LAUlGBCzvpgyI44H01eb")
      .orderBy("categoryId")
      .get()
      .then(snapshot => {
        const allCategories = snapshot.docs.map(category => ({
          ...category.data(),
          docId: category.id
        }));

        if (JSON.stringify(allCategories) !== JSON.stringify(categories)) {
          setCategories(allCategories);
        }
      });
  }, [categories]);

  return { categories, setCategories };
};
