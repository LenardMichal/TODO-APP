import React, { useState, useRef } from 'react';

import classes from './LoginForm.module.css';

const LoginForm = props => {
  const [loginState, setLoginState] = useState('');
  const [pwdState, setPwdState] = useState('');

  const pwdField = useRef(null);

  return (
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
  );
};

export default LoginForm;
