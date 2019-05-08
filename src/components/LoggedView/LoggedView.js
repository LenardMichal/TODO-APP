import React, { Fragment } from 'react';
import classes from './LoggedView.module.css';
import InputTodo from '../InputTodo/InputTodo';
const LoggedView = props => {
  //Render list of todo elements
  let list = props.todoList.todo.map(el => {
    //Add style for elements that are done
    let doneStyle = '';
    if (el.done === true) {
      doneStyle = classes.doneStyle;
    }

    return (
      <li key={el._id} className={doneStyle}>
        <span>{el.content}</span>
        <span>{el.user}</span>
        <button value={el._id} onClick={e => props.taskDone(e.target.value)}>
          DONE
        </button>
      </li>
    );
  });

  return (
    <Fragment>
      <h2>DB name: {props.todoList.login}</h2>
      <InputTodo addTask={props.addTask} />
      <ul className={classes.LoggedView}>{list}</ul>;
    </Fragment>
  );
};

export default LoggedView;
