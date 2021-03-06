/*global Redux */
import "expect";
import deepFreeze from "deepfreeze";

const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, todo(undefined, action)];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

//const { combineReducers } = Redux;
const combineReducers = reducers => (state = {}, action) =>
    Object.keys(reducers).reduce((nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
    }, {});

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: "ADD_TODO",
        id: 0,
        text: "Learn Redux"
    };
    const stateAfter = [
        {
            id: 0,
            text: "Learn Redux",
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: "Learn Redux",
            completed: false
        },
        {
            id: 1,
            text: "Go shopping",
            completed: false
        }
    ];
    const action = {
        type: "TOGGLE_TODO",
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: "Learn Redux",
            completed: false
        },
        {
            id: 1,
            text: "Go shopping",
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.info("All tests passed.");

const { createStore } = Redux;
const store = createStore(todoApp);

console.log("initial state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching ADD_TODO");
store.dispatch({
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
});
console.log("current state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching ADD_TODO");
store.dispatch({
    type: "ADD_TODO",
    id: 1,
    text: "Go shipping"
});
console.log("current state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching TOGGLE_TODO");
store.dispatch({
    type: "TOGGLE_TODO",
    id: 0
});
console.log("current state:");
console.log(store.getState());
console.log("--------------");

console.log("Dispatching SET_VISIBILITY_FILTER");
store.dispatch({
    type: "SET_VISIBILITY_FILTER",
    filter: "SHOW_COMPLETED"
});
console.log("current state:");
console.log(store.getState());
console.log("--------------");
