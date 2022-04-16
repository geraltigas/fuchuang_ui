import React, {useEffect, useState} from 'react';
import './App.css';
import Show from "./components/Show";
import Tree from "./components/Tree";
import {JSON, objectToJSON, parse} from "./utils/parse";

const dataG = objectToJSON(require("../src/static/category.json"));

const App = () => {

    useEffect(() => {
    },[])

    const [clickedData,setClickedData] = useState<JSON>(dataG);

  return (
    <div className="App">
      <Tree setClickedData={setClickedData}/><Show clickedData={clickedData}/>
    </div>
  );
}

export { dataG }

export default App;
