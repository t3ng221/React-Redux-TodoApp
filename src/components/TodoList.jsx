/* eslint-disable react/prop-types */
// components/TodoList.js

import { Grid } from "@material-ui/core";
import TodoCard from "./TodoCard";

const TodoList = ({ todos, onDeleteTodo, editTodo, onSaveTodo }) => {
  return (
    <Grid container spacing={2}>
      {todos.map((todo) => (
        <Grid item key={todo.id} xs>
          <TodoCard
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            editTodo={editTodo}
            onSaveTodo={onSaveTodo}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;
