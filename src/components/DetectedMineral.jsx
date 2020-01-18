import React from 'react';
import styled from 'styled-components';

const PercentageInput = styled.input`
  background: white;
`;

export default function DetectedMineral({mineral, handleChange}) {
  return (
    <div>
      <div style={{ color: 'white'}}>{mineral.name}</div>
      <PercentageInput min={0} max={0} value={mineral.percentage} onChange={e => handleChange(mineral.name, e.target.value)} />
    </div>
  );
};
