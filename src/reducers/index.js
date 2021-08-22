import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import editingTask from "./editingTask";
import filterTable from "./filter";
import searchTask from "./searchTask";
import sortTasks from "./sortTasks";

const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    editingTask,
    filterTable,
    searchTask,
    sortTasks
});

export default myReducer;