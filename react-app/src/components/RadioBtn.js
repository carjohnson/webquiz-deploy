import React from 'react';

const RadioBtn = ({ opt, name, isSelected, onRadioBtnChange }) => (
  <div className="form-radio">
    <label>
      <input
        type="radio"
        name={name}
        value={opt}
        checked={isSelected}
        onChange={onRadioBtnChange}
        className="form-radio-input"
      />
      {opt}
    </label>
  </div>
);

export default RadioBtn;
 