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
      localStorage.setItem('login', credentialState.login);
      sessionStorage.setItem('pwd', credentialState.pwd);
    }
  }, [credentialState]);

  //Log in based on sessionStorage
  useEffect(() => {
    if (
      credentialState === null &&
      localStorage.getItem('login') &&
      sessionStorage.getItem('pwd')
    ) {
      const login = localStorage.getItem('login');
      const pwd = sessionStorage.getItem('pwd');
      // console.log(credentialState);
      setCredentialState({ login, pwd });
    }
    // eslint-disable-next-line
  }, []);

  //Function that updates render view with fetched data
  async function updateViewHandler() {
    try {
      let data = await loginRequest(credentialState);
      setDataState(data);
    } catch (err) {
      console.log(err);
    }
  }

  //Function for updates
  function updateData() {
    // console.log(credentialState, dataState);
    if (credentialState || dataState) {
      // console.log('inside condition block');
      updateViewHandler();
    }
  }
  //Fetch from server
  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [credentialState]);

  //useEffect for fetching each 5secs.
  // useEffect(() => {
  //   setInterval(updateData, 1000);
  // }, []);

  //Makes done true for selected element
  function taskDoneHandler(id) {
    const state = Object.assign({}, dataState);
    let currentTODO = state.todo.filter(value => value._id === id)[0];
    currentTODO.done = true;
    setDataState(state);
    updateRequest(dataState);
  }

  //Adds new task to list
  async function addTaskHandler(task) {
    try {
      const state = Object.assign({}, dataState);
      const newTask = {
        content: task.content,
        user: task.user,
      };
      state.todo.unshift(newTask);
      let updatedState = await updateRequest(state);
      setDataState(updatedState);
    } catch (err) {
      console.log(err);
    }
  }

  //Function that cleanup list
  async function cleanupListHandler() {
    let state = Object.assign({}, dataState);
    let notDoneTasks = state.todo.filter(element => element.done === false);
    state.todo = notDoneTasks;
    setDataState(state);
    updateRequest(state);
  }

  //Login handler for any future purposes
  function loginHandler(credential) {
    setCredentialState(credential);
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
        cleanupList={cleanupListHandler}
      />
    );
  }

  return (
    <div className={classes.App}>
      <h1>TODO App</h1>

      {view}
    </div>
  );
}

export default App;

/*
  Things that this component will do:
  1. Checks that login,password exists and fetch for them
  2. Render view based on dataState 

*/
