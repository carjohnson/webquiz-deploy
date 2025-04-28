import React from "react";

const DropDown = ({  isSelected, onDropDownChange, arr }) => (
    <div className="form-dropdown">
      <select>
        <input
          type="dropdown"
          value={isSelected}
          onChange={onDropDownChange}
          className="form-dropdown-input"
        />
        {
          arr.map((option, index) => (
              <option key={index} value={option}>
                  {option}
              </option>
          ))
      }

      </select>
    </div>
  );
  
  export default DropDown;