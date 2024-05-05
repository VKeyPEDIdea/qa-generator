import React from 'react';
import classes from './InputNumber.module.css';

interface InputNumber {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  min?: number;
  max?: number;
}

const InputNumber = ({ onChange, value, min, max }: InputNumber) => {
  return (
    <input
      type="number"
      className={classes.input}
      min={min}
      max={max}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputNumber;
