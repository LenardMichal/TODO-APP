import React from 'react';

const InputTodo = props => {
  return (
    <div>
      <input type='text' />
      <input type='text' />
      <button
        onClick={e => {
          props.addTask({ user: 'Michał', content: 'Costam jest' });
        }}
      >
        {' '}
        Add
      </button>
    </div>
  );
};

export default InputTodo;
