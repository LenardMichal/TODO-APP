import React, { useState, useEffect } from 'react';
import LoggedView from '../../components/LoggedView/LoggedView';
import LoginForm from '../../components/LoginForm/LoginForm';
import loginRequest from '../../utils/loginRequest';
import updateRequest from '../../utils/updateRequest';
import classes from './App.module.css';

function App() {
  //credentialState is for login password pair
  //dataState is for TODO data
  const [credentialState, setCredentialState] = useState(null);
  const [dataState, setDataState] = useState(null);

  let view = <div>View</div>;

  //Save to sessionStorage
  useEffect(() => {
    if (credentialState) {
      sessionStorage.setItem('login', credentialState.login);
      sessionStorage.setItem('pwd', credentialState.pwd);
    }
  }, [credentialState]);

  //Log in based on sessionStorage
  useEffect(() => {
    if (
      credentialState === null &&
      sessionStorage.getItem('login') &&
      sessionStorage.getItem('pwd')
    ) {
      console.log('it works here');
      const login = sessionStorage.getItem('login');
      const pwd = sessionStorage.getItem('pwd');

      setCredentialState({ login, pwd });
    }
  }, [credentialState]);

  //Fetch from server
  useEffect(() => {
    if (credentialState) {
      updateViewHandler();
    }
    // eslint-disable-next-line
  }, [credentialState]);

  function loginHandler(credential) {
    setCredentialState(credential);
  }
  //Function that updates render view with fetched data
  async function updateViewHandler() {
    try {
      let data = await loginRequest(credentialState);
      setDataState(data);
    } catch (err) {
      console.log(err);
    }
  }

  //Makes done true for selected element
  function taskDoneHandler(id) {
    const state = Object.assign({}, dataState);
    let currentTODO = state.todo.filter(value => value._id === id)[0];
    currentTODO.done = true;
    setDataState(state);
    updateRequest(dataState);
  }

  //Adds new task to list
  function addTaskHandler(task) {
    const state = Object.assign({}, dataState);
    const newTask = {
      content: task.content,
      user: task.user,
    };
    state.todo.unshift(newTask);
    updateRequest(state);
    updateViewHandler();
  }

  //Rerender based on dataState
  if (dataState === null) {
    view = <LoginForm login={loginHandler} />;
  } else {
    view = (
      <LoggedView
        todoList={dataState}
        taskDone={taskDoneHandler}
        addTask={addTaskHandler}
      />
    );
  }

  return (
    <div className={classes.App}>
      <h1>TODO App</h1>
      <section>{view}</section>
    </div>
  );
}

export default App;

/*
  Things that this component will do:
  1. Checks that login,password exists and fetch for them
  2. Render view based on dataState 

*/
