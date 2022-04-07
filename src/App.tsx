import React, {useEffect} from 'react';
import './App.css';
import Show from "./components/Show";
import Tree from "./components/Tree";
import {objectToJSON, parse} from "./utils/parse";


const data = objectToJSON(require("../src/static/category.json"));
const {nodes,edges} = parse(data);

function App() {

    useEffect(() => {
        console.log(nodes,edges);
    },[])

  return (
    <div className="App">
      <Tree data={data}/><Show />
    </div>
  );
}

export default App;
