import React from 'react';
import MineralList from './components/MineralList.jsx';
import './App.css';
import styled from 'styled-components';
import backgroundImage from './styles/images/prospector-mining-yela.png';

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
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
