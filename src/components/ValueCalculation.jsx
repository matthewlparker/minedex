import React from 'react';
import { NumberFormatStyled } from './common/StyledComponents.js';
import styled from 'styled-components';

const ValueResultWrapper = styled.div`
  height: 41px;
`;

export default function ValueCalculation({ minerals, mass }) {
  let values = [];
  minerals.forEach(mineral => {
    if (!mineral.percentage) mineral.percentage = 0;
    let value = Math.floor((mass / 100) * (mineral.percentage * 2)) * mineral.value;
    values.push(value);
  })
  let result;
  if (minerals.length > 0) {
    result = values.reduce((current, accumulator) => current + accumulator);
  } else {
    result = 0;
  }
  result = result.toFixed(2);
  return (
    <ValueResultWrapper>
      <NumberFormatStyled value={result} displayType={'text'} thousandSeparator={true} suffix={'  aUEC'} />
    </ValueResultWrapper>
  );
};
