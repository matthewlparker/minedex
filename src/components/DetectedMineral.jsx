import React from "react";
import { NumberFormatStyled } from './common/StyledComponents.js';
import styled from 'styled-components';
import { colors } from '../styles/colorMachine.js';

const DetectedMineralContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, auto);
  align-items: center;
`;

const DetectedMineralStyled = styled(NumberFormatStyled)`
  font-size: 16px;
  margin: 0;
  width: 41px;
  padding: 2.5px 5px;
`;

const Label = styled.label`
  display: block;
  font-size: 10px;
  text-align: left;
  text-transform: uppercase;
  color: ${colors.textActive};
`;

const DetectedMineralRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  color: ${colors.text};
`;

export default function DetectedMineral({ mineral, mass, handleChange }) {
  const handleFocus = e => e.target.select();
  const units = Math.floor((mass / 100) * ((mineral.percentage || 0)* 2));
  const scu = units / 100;
  const value = (scu * 100) * (mineral.value || 0);
  return (
    <DetectedMineralContainer>
      <div style={{ marginTop: '5px' }}>
      <Label>{mineral.name}</Label>
      <DetectedMineralRow>
        <DetectedMineralStyled
          value={mineral.percentage}
          isAllowed={values => {
            const { value } = values;
            if (value.includes("-")) return false;
            return true;
          }}
          onFocus={handleFocus}
          onValueChange={values => handleChange(mineral.name, values.floatValue)}
        />
        <div>scu: {scu}</div>
        <div>value: {value.toFixed(2)}</div>
      </DetectedMineralRow>
      </div>
      
    </DetectedMineralContainer>
  );
}
