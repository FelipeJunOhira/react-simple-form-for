import React from 'react';

const theme = {
  formClasses: 'form',
  components: {
    input: TextInput,
    select: SelectInput,
    radio: RadioInput,
    button: ButtonInput
  }
};

export default theme;

function TextInput({ name, options, model, onFieldChange }) {
  return (
    <div>
      <label>{name}</label>
      <input
        value={model[name] || ''}
        onChange={event => onFieldChange(event.target.value)}
      />
    </div>
  )
}

function SelectInput({ name, options, model, onFieldChange }) {
  const { collection } = options;
  const keys = Object.keys(collection);

  return (
    <div>
      <label>{name}</label>
      <select
        value={model[name] || ''}
        onChange={event => onFieldChange(event.target.value)}
      >
        {
          keys.map((key, index) => {
            return (
              <option key={index} value={key}>{collection[key]}</option>
            );
          })
        }
      </select>
    </div>
  )
}

function RadioInput({ name, options, model, onFieldChange }) {
  const { collection } = options;
  const keys = Object.keys(collection);

  return (
    <div>
      <label>{name}</label>
      {
        keys.map((key, index) => {
          return (
            <span key={index}>
              <input
                type="radio"
                name={name}
                value={key}
                checked={model[name] === key ? 'checked' : false}
                onChange={event => onFieldChange(event.target.value)}
                />
              {collection[key]}
            </span>
          );
        })
      }
    </div>
  )
}

function ButtonInput({ name, options }) {
  return (
    <button type='submit'>
      {name}
    </button>
  )
}
