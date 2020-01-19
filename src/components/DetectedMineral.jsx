import React from "react";
import { NumberFormatStyled } from './common/StyledComponents.js';

export default function DetectedMineral({ mineral, handleChange }) {
  const handleFocus = e => e.target.select();
  return (
    <div>
      <div style={{ color: "white" }}>{mineral.name}</div>
      <NumberFormatStyled
        value={mineral.percentage}
        isAllowed={values => {
          const { value } = values;
          if (value.includes("-")) return false;
          return true;
        }}
        onFocus={handleFocus}
        onValueChange={values => handleChange(mineral.name, values.floatValue)}
      />
    </div>
  );
}
