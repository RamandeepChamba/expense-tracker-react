import { useState } from "react";

function Select({ options, name, isMultiple = false, onOptionSelect }) {
  const [selectedOptions, setSelectedOptions] = useState(isMultiple ? [] : "");

  function handleSelect(e) {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(values);
    onOptionSelect(values);
    console.log(values);
  }

  return (
    <select
      value={selectedOptions}
      onChange={handleSelect}
      multiple={isMultiple}
    >
      <option value="" disabled>
        {name}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
