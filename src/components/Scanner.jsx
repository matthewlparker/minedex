import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { colors, shadows, hexToRGBA } from "../styles/colorMachine.js";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const shadowPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0px ${hexToRGBA(colors.textActive, 0.7)};
  }
  100% {
    box-shadow: 0 0 10px 100px rgba(0, 0, 0, 0);
  }
`;

// const shadowPulse = keyframes`
//   0% {
//     box-shadow: inset 0 0 6px ${hexToRGBA(
//       colors.textActive,
//       1
//     )}, border: 2px solid ${colors.textActive};
//   }
//   50% {
//     box-shadow: inset 0 0 0;
//   }
// `;

const shadowPulseAnimation = props =>
  css`
    ${shadowPulse} 2s linear infinite, ${props =>
    props.scanning ? shadows.borderActive : ""};
  `;

const MineralDexContainer = styled.div`
  display: grid;
  grid-template-columns: 140px auto 140px;
  grid-gap: 2px;
  // max-height: ${props => (props.scanning ? "1000px" : "53px")};
  transition: max-height 0.15s ease-in-out;
  // margin-top: 50px;
`;

const MineralEntryBRCorner = styled.div`
  &:before {
    position: absolute; right: -1px; bottom: -1px; content: '';
    border-bottom: 11px solid ${props =>
      props.detected ? colors.textActive : colors.border};
    border-left: 11px solid transparent;
  };
  &:after {
    position: absolute; right: -2px; bottom -2px; content: '';
    border-bottom: 10px solid ${colors.backgroundMain};
    border-left: 10px solid transparent;
  }
`;

const MineralEntry = styled.div.attrs(props => ({
  style: {
    color: props.detected ? colors.textActive : colors.text,
    background: props.even ? colors.backgroundLight : colors.backgroundDark,
    border: `1px solid ${props.detected ? colors.textActive : colors.border}`,
    textShadow: props.detected ? shadows.textActive : "",
    borderShadow: props.detected ? shadows.borderActive : "",
    opacity: props.scanning ? 1 : 0,
    transform: props.scanning
      ? "translateX(0)"
      : props.even
      ? "translateX(180px)"
      : "translateX(-180px)",
    transition: props.scanning
      ? `transform 0.15s ease-in-out ${props.delay}s, opacity 1s ease`
      : ""
  }
}))`
  position: relative;
  font-size: 14px;
  padding: 5px 10px;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  
  &:hover {
    color: ${colors.textActive} !important;
    text-shadow: ${shadows.textActive};
  };
  &:hover {
    &::before {
      border-top: 11px solid ${colors.textActive};
    }
  }
  &:hover ${MineralEntryBRCorner} {
    &::before {
      border-bottom: 11px solid ${colors.textActive};
    }
  }
  &:before {
    position: absolute; left: -1px; top: -1px; content: '';
    border-top: 11px solid ${props =>
      props.detected ? colors.textActive : colors.border};
    border-right: 11px solid transparent;
  };
  &:after {
    position: absolute; left: -2px; top -2px; content: '';
    border-top: 10px solid ${colors.backgroundMain};
    border-right: 10px solid transparent;
  }
`;

const ScanText = styled.div`
  display: ${props => (props.scanning ? "none" : "")};
  color: ${colors.textActive};
  transition: 0.15s ease-in-out;
`;

const ScannerBRCorner = styled.div`
  &:after {
    display: ${props => (props.scanning ? "none" : "inline")};
    position: absolute;
    right: -2px;
    bottom: -2px;
    content: "";
    border-bottom: 25px solid ${colors.backgroundMain};
    border-left: 25px solid transparent;
  }
  &:before {
    display: ${props => (props.scanning ? "none" : "inline")};
    position: absolute;
    right: -1px;
    bottom: -1px;
    content: "";
    border-bottom: 28px solid ${colors.border};
    border-left: 28px solid transparent;
    transition: 0.15s ease-in-out;
  }
`;

const ScanButton = styled.div`
  position: relative;
  align-self: center;

  height: ${props => (props.scanning ? "100%" : "53px")};
  width: ${props => (props.scanning ? "1px" : "155px")};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  cursor: pointer;

  background: ${colors.backgroundLight};
  border: 2px solid
    ${props => (props.scanning ? colors.textActive : colors.border)};
  border-radius: ${props => (props.scanning ? "2.5px" : "")};
  user-select: none;
  box-shadow: ${props => (props.scanning ? shadows.borderActive : "")};
  transition: all 0.15s ease-in-out, height 0.2s ease-in-out;

  &:hover ${ScanText} {
    text-shadow: ${props => (props.scanning ? "" : shadows.textActive)};
  }
  &:hover ${ScannerBRCorner} {
    &::before {
      border-bottom: 28px solid ${colors.textActive};
    }
  }
  &:hover {
    &::before {
      border-top: 28px solid ${colors.textActive};
    }
  }
  &:before {
    display: ${props => (props.scanning ? "none" : "inline")};
    position: absolute;
    left: -1px;
    top: -1px;
    content: "";
    border-top: 28px solid ${colors.border};
    border-right: 28px solid transparent;
    transition: 0.15s ease-in-out;
  }
  &:after {
    display: ${props => (props.scanning ? "none" : "inline")};
    position: absolute;
    left: -2px;
    top: -2px;
    content: "";
    border-top: 25px solid ${colors.backgroundMain};
    border-right: 25px solid transparent;
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
  display: none;
  background: ${props => (props.scanning ? colors.backgroundMain : "")};
`;

const MineralIndex = styled.div`
  display: grid;
  grid-gap: 5px;
  overflow: hidden;
`;

const ScannerLeft = styled(MineralIndex)``;

const ScannerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover ${ScanButton} {
    box-shadow: ${props =>
      props.scanning
        ? `0 0 10px 5px rgba(0,112,202,0.8), 0 0 10px 3px rgba(0,237,255,0.6)`
        : ""};
  }
`;

const ScannerRight = styled(MineralIndex)``;

export default function Scanner({ minerals, handleClick }) {
  const [scanning, setScanning] = useState(false);
  const even = num => num % 2 === 0;
  let mineralsLeft = [];
  let mineralsRight = [];
  minerals.forEach((mineral, index) => {
    const orderedMineral = {
      ...mineral,
      order: index
    };
    if (even(index)) {
      mineralsLeft.push(orderedMineral);
    } else {
      mineralsRight.push(orderedMineral);
    }
  });
  const time = (variation, minimum) => Math.random() * variation + minimum;
  return (
    <MineralDexContainer scanning={scanning}>
      <ScannerLeft>
        {mineralsLeft.map((mineral, i) => (
          <MineralEntry
            key={`${i}-left`}
            onClick={mineral.disabled ? null : () => handleClick(mineral.order)}
            detected={mineral.detected}
            even={even(mineral.order)}
            scanning={scanning}
            delay={time(0.05, 0.15)}
          >
            {mineral.name}
            <MineralEntryBRCorner detected={mineral.detected} />
          </MineralEntry>
        ))}
      </ScannerLeft>
      <ScannerCenter
        scanning={scanning}
        onClick={() => (scanning ? setScanning(!scanning) : null)}
      >
        <ScanButton onClick={() => setScanning(!scanning)} scanning={scanning}>
          <ScanText scanning={scanning}>Scan</ScanText>
          <ScanningIndicator scanning={scanning} />
          <ScannerBRCorner scanning={scanning} />
        </ScanButton>
      </ScannerCenter>
      <ScannerRight>
        {mineralsRight.map((mineral, i) => (
          <MineralEntry
            key={`${i}-right`}
            onClick={mineral.disabled ? null : () => handleClick(mineral.order)}
            detected={mineral.detected}
            even={even(mineral.order)}
            scanning={scanning}
            delay={time(0.05, 0.15)}
          >
            {mineral.name}
            <MineralEntryBRCorner detected={mineral.detected} />
          </MineralEntry>
        ))}
      </ScannerRight>
    </MineralDexContainer>
  );
}
