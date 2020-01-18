import React from 'react';

export default function ValueCalculation({ minerals, mass }) {
  let values = [];
  minerals.forEach(mineral => {
    let value = Math.floor((mass / 100) * (mineral.percentage * 2)) * mineral.value;
    values.push(value);
  })
  let result;
  if (minerals.length > 0) {
    result = values.reduce((current, accumulator) => current + accumulator);
  }
  return (
    <div style={{ color: 'white' }}>{result}</div>
  );
};
