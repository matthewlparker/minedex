import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors, shadows, hexToRGBA } from "../styles/colorMachine.js";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// const shadowPulse = keyframes`
//   0% {
//     box-shadow: 0 0 0 0px ${hexToRGBA(colors.textActive, 0.7)};
//   }
//   100% {
//     box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
//   }
// `;

const shadowPulse = keyframes`
  0% {
    box-shadow: inset 0 0 6px ${hexToRGBA(colors.textActive, 1)}, border: 2px solid ${colors.textActive};
  }
  50% {
    box-shadow: inset 0 0 0;
  }
`;


const MineralDexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2px;
  grid-column-gap: 45px;
  max-height: ${props => (props.scanning ? "1000px" : "0px")};
  overflow: hidden;
  transition: max-height 0.15s ease-in-out;
  margin-top: 50px;
`;

const MineralDex = styled.div`
  color: ${props => (props.detected ? colors.textActive : colors.text)};
  background: ${props =>
    props.even ? colors.backgroundLight : colors.backgroundDark};
  font-size: 14px;
  text-transform: uppercase;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid ${props =>
    props.detected ? colors.textActive : colors.border};
  // text-shadow: ${props =>
    props.detected
      ? shadows.textColorCustom(hexToRGBA(colors.green, 0.4))
      : ""};
  text-shadow: ${props => (props.detected ? shadows.textActive : "")};
  border-shadow ${props => (props.detected ? shadows.borderActive : "")};
  transition: border 0.15s ease-in-out;
  user-select: none;
  margin-top: 5px;
  // z-index: 2;
  &:hover {
    color: ${colors.textActive};
    // color: ${colors.blue};
    text-shadow: ${shadows.textActive};
  }
`;

const ScanText = styled.div`
  // margin-left: ${props => (props.scanning ? "-430px" : "0px")};
  // transition: 0.15s ease-in-out;
  // transition-delay: 0.15s;
  // color: transparent;
  // display: ${props => (props.scanning ? "none" : "")}
  // color: ${props => (props.scanning ? "transparent" : colors.textActive)};
  color: ${colors.textActive};
  transition: 0.15s ease-in-out;
  width: ${props => (props.scanning ? "0px" : "auto")};
  overflow: hidden;

`;

const ScanButton = styled.div`
  position: absolute;
  top: 50px;

  height: ${props => (props.scanning ? "315px" : "53px")};
  width: ${props => (props.scanning ? "1px" : "155px")};

  display: flex;
  left: ${props => (props.scanning ? "155px" : "77.5px")};
  align-items: center;
  justify-content: center;

  font-size: 24px;
  cursor: pointer;

  background: ${colors.backgroundLight};
  border: 2px solid ${props => props.scanning ? colors.textActive : colors.border};
 
  user-select: none;
  box-shadow: ${props => props.scanning ? shadows.borderActive : ""};

  transition: all .15s ease-in-out, height .2s ease-in-out;

  overflow: visible;
  &:hover ${ScanText} {
    text-shadow: ${props => (props.scanning ? "" : shadows.textActive)};
  }
`;

const ScanningIndicator = styled.div`
  display: ${props => (props.scanning ? "initial" : "none")};
  position: absolute;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid ${colors.textActive};
  box-shadow: 0 0 4px ${hexToRGBA(colors.textActive, 0.4)};
  width: 30px;
  height: 30px;
  padding: 5px;
  animation: ${spin} 0.7s linear infinite, ${shadowPulse} 2s linear infinite;

  background: ${props => (props.scanning ? colors.backgroundMain : "")};
`;

export default function Scanner({ minerals, handleClick }) {
  const [scanning, setScanning] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <MineralDexContainer scanning={scanning}>
        {minerals.map((mineral, i) => (
          <MineralDex
            key={i}
            onClick={mineral.disabled ? null : () => handleClick(i)}
            detected={mineral.detected}
            even={i % 2 === 0}
          >
            {mineral.name}
          </MineralDex>
        ))}
         <ScanButton onClick={() => setScanning(!scanning)} scanning={scanning}>
          <ScanText scanning={scanning}>
            {scanning ? "Scanning" : "Scan"}
          </ScanText>
          <ScanningIndicator scanning={scanning} />
        </ScanButton>
      </MineralDexContainer>
     
    </div>
  );
}
