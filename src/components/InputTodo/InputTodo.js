import React, { useState, useEffect } from 'react';
import classes from './InputTodo.module.css';

const InputTodo = props => {
  const [commentState, setCommentState] = useState('');
  const [userState, setUserState] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUserState(localStorage.getItem('user'));
    }
  }, []);

  return (
    <div className={classes.InputTodo}>
      <input
        type='text'
        value={commentState}
        onChange={e => setCommentState(e.target.value)}
        maxLength='300'
        placeholder='Add TODO'
      />
      <input
        type='text'
        value={userState}
        onChange={e => setUserState(e.target.value)}
        maxLength='30'
        placeholder='By'
      />
      <button
        onClick={e => {
          localStorage.setItem('user', userState);
          props.addTask({ user: userState, content: commentState });
        }}
      >
        Add
      </button>
      <button onClick={props.cleanupList}>CleanUp</button>
    </div>
  );
};

export default InputTodo;
