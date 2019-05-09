import React, { useState, useRef, useEffect, Fragment } from 'react';

import classes from './LoginForm.module.css';

const LoginForm = props => {
  const [loginState, setLoginState] = useState('');
  const [pwdState, setPwdState] = useState('');

  const pwdField = useRef(null);

  //Effect for last db name in input
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLoginState(localStorage.getItem('login'));
    }
  }, []);

  return (
    <Fragment>
      <section className={classes.LoginForm}>
        <input
          type='text'
          maxLength='30'
          value={loginState}
          placeholder='DB name'
          onChange={e => setLoginState(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              pwdField.current.focus();
            }
          }}
        />
        <input
          type='password'
          maxLength='30'
          value={pwdState}
          ref={pwdField}
          placeholder='Password'
          onChange={e => setPwdState(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              props.login({ login: loginState, pwd: pwdState });
            }
          }}
        />

        <button
          onClick={e => {
            console.log();
            props.login({ login: loginState, pwd: pwdState });
          }}
        >
          Get In!
        </button>
      </section>
      <section className={classes.disclaimer}>
        <h1>Disclaimer!</h1>
        <p>
          TODO app only for fun purposes. I'm not responsible for any content
          added by 3rd party users. Todo list is created for each
          DBName-password pair, and password isn't encrypted in database. Use
          with caution.
        </p>
      </section>
    </Fragment>
  );
};

export default LoginForm;
