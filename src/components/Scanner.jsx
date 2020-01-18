import React from 'react';
import styled from 'styled-components';

const MineralDex = styled.div`
  background: ${props => props.detected ? 'green' : 'white'};
`;

export default function Scanner({ minerals, handleClick }) {  
  return (
    <div>
      {minerals.map((mineral, i) => <MineralDex key={i} onClick={ mineral.disabled ? null : () => handleClick(i)} detected={mineral.detected}>{mineral.name}</MineralDex>)}
    </div>
  );
};
