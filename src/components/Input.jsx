import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { colors, shadows } from '../styles/colorMachine.js';

export const NumberFormatStyled = styled(NumberFormat)`
  color: ${colors.textActive};
  padding: 5px 10px;
  background: ${colors.backgroundLight};
  border: 1px solid ${colors.border};
  // box-shadow: inset 0px 0px 5px ${colors.blue};
  font-size: 24px;
  margin: 5px auto;
`;

export default function Input(props) {
  return (
    <NumberFormatStyled />
  );
}
