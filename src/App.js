import React from 'react';
import MineralList from './components/MineralList.jsx';
import { colors } from './styles/colorMachine.js';
import './App.css';
import styled from 'styled-components';
import backgroundImage from './styles/images/prospector-mining-yela.png';

const Main = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // background-image: url(${backgroundImage});
  // background-repeat: no-repeat;
  // background-position: center center;
  // background-size: cover;
  background-color: ${colors.backgroundMain};
`;

function App() {
  return (
    <div className="App">
      <Main>
        <MineralList/>
      </Main>
    </div>
  );
}

export default App;
