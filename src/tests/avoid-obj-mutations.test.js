import "expect";
import deepFreeze from "deepfreeze";

const toggleTodo = todo => {
    // return Object.assign({}, todo, {
    //     completed: !todo.completed
    // });
    return {
        ...todo,
        completed: !todo.completed
    };
};

const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: "Learn Redux",
        completed: false
    };
    const todoAfter = {
        id: 0,
        text: "Learn Redux",
        completed: true
    };

    deepFreeze(todoBefore);

    expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();
console.info("All test passed.");
