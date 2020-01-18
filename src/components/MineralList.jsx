import React, { useState } from "react";
import Scanner from "./Scanner.jsx";
import DetectedMineral from "./DetectedMineral.jsx";
import ValueCalculation from './ValueCalculation';
import styled from "styled-components";
import { mineralData } from "../mineral-data/minerals.js";

const MineralListContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
`;

export default function MineralList() {
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
      <Scanner minerals={minerals} handleClick={handleMineralScanned} />
      <input style={{ background: 'white' }} type="number" value={mass} onChange={e => setMass(e.target.value)} />
      {minerals
        .filter(mineral => mineral.detected)
        .sort((a, b) => b.value - a.value)
        .map((mineral, i) => (
          <DetectedMineral key={`detected-${i}`} mineral={mineral}  handleChange={handlePercentageChanged} />
        ))}
      <ValueCalculation minerals={minerals.filter(mineral => mineral.detected)} mass={mass} />
    </MineralListContainer>
  );
}
