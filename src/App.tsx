import React, {useEffect, useState} from 'react';
import './App.css';
import Show from "./components/Show";
import {JSON, objectToJSON} from "./utils/parse";
import Tree from "./components/Tree";

const dataG = objectToJSON(require("./static/category.json"),null as any as JSON,null as any as number);

function App() {

    const [dataClickedG,setDataClickedG] = useState<JSON>(new JSON('所有商品',0,4412335,598193,new Array<JSON>(),null as any as JSON, null as any as number));

  return (
    <div className="App">
      <Tree setDataClickedG={setDataClickedG}/><Show dataClickedG = {dataClickedG}/>
    </div>
  );
}

export {dataG};

export default App;
