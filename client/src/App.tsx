import React, { useState, useEffect } from 'react';
import './App.css';
import MainScreen from './Pages/MainScreen';
import { Context } from './store/Context';
import appCtxDefaultValue from './store/Type'


function App() {
  const [state, setState] = useState(appCtxDefaultValue.state);

  return (
    <div className="App">
      <Context.Provider value={{ state, setState}}>
        <MainScreen />
      </Context.Provider>
    </div>
  );
}

export default App;
