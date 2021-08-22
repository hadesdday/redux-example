import * as types from "../constants/ActionTypes";

var randomstring = require("randomstring");

function generateId() {
    return randomstring.generate();
}

var data = JSON.parse(localStorage.getItem('tasks'));

var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (!newTask.id) {
                newTask.id = generateId();
                state.push(newTask);
            } else {
                let updateIndex = state.findIndex(task => task.id === newTask.id);
                state[updateIndex] = newTask;
            }

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]; // es6 spread operator

        case types.UPDATE_STATUS:
            let index = state.findIndex(task => task.id === action.id);

            state[index] = {
                ...state[index],
                status: !state[index].status
            }

            // var cloneTask = {
            //     ...state[index]
            // };
            // cloneTask.status = !cloneTask.status;
            // state[index] = cloneTask;

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.REMOVE_TASK:
            let removeIndex = state.findIndex(task => task.id === action.id);
            state.splice(removeIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        default: return state;
    }

}

export default myReducer;