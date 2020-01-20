import React, { useState } from "react";
import Scanner from "./Scanner.jsx";
import DetectedMineral from "./DetectedMineral.jsx";
import ValueCalculation from './ValueCalculation';
import styled from "styled-components";
import { mineralData } from "../mineral-data/minerals.js";
import { NumberFormatStyled } from './common/StyledComponents.js';

const MineralListContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 267px auto;
  max-width: 720px;
  // margin: 5px auto;
  margin-top: 50px;
`;

const ScanResults = styled.div`
  // display: none;
  max-width: 300px;
  margin: 0 auto;
`;

const MassInput = styled(NumberFormatStyled)`
  border: none;
  background: none;
  box-shadow: none;
  position: relative;
  &:after {
    // content: '';
    // position: absolute; left: 0; bottom: -5px;
    // background: red;
    // width: 100%;
    // height: 2px;

    position: absolute;
        content: '';
        height: 2px;
        bottom: -4px; 
        margin: 0 auto;
		  left: 0;
        right: 0;
		  width: 50%;
		  background: green;
  }
`;

export default function MineralList() {
  const [scan, setScan] = useState(false);
  const [minerals, setMinerals] = useState(
    Object.keys(mineralData).map(mineral => ({
      name: mineral,
      value: mineralData[mineral],
      percentage: 0,
      detected: false,
      disabled: false
    }))
  );

  const [mass, setMass] = useState(0);

  const handleMineralScanned = index => {
    let scannedMinerals = minerals.map(mineral => ({
      ...mineral,
      disabled: false
    }));
    scannedMinerals[index].detected = !scannedMinerals[index].detected;
    if (!scannedMinerals[index].detected) {
      scannedMinerals[index].percentage = 0;
    }

    let includedMinerals = [];
    let excludedMinerals = [];

    scannedMinerals.forEach(mineral => {
      mineral.detected
        ? includedMinerals.push(mineral)
        : excludedMinerals.push(mineral);
    });

    if (includedMinerals.length >= 5) {
      excludedMinerals = excludedMinerals.map(excludedMineral => ({
        ...excludedMineral,
        disabled: true
      }));
      let mineralList = [...includedMinerals, ...excludedMinerals];
      mineralList.sort((a, b) => b.value - a.value);
      setMinerals(mineralList);
    } else {
      setMinerals(scannedMinerals);
    }
  };

  const handlePercentageChanged = (name, percentage)=> {
    let updatedMinerals = minerals.map(mineral => ({
      ...mineral,
      percentage: name === mineral.name ? percentage : mineral.percentage,
    }));
    setMinerals(updatedMinerals);
  }

  return (
    <MineralListContainer>
      <Scanner minerals={minerals} handleClick={handleMineralScanned} scan={scan} setScan={setScan} />
      {/* <MassInput type="number" value={mass} onChange={e => setMass(e.target.value)} /> */}
      <ScanResults>
        <MassInput value={mass} thousandSeparator={true} suffix={' kg'}  onValueChange={values => setMass(values.floatValue)}/>
        {minerals
          .filter(mineral => mineral.detected)
          .sort((a, b) => b.value - a.value)
          .map((mineral, i) => (
            <DetectedMineral key={`detected-${i}`} mineral={mineral} mass={mass}  handleChange={handlePercentageChanged} />
          ))}
        <ValueCalculation minerals={minerals.filter(mineral => mineral.detected)} mass={mass} />
      </ScanResults>
     
    </MineralListContainer>
  );
}
