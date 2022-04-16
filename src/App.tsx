import React, {MouseEventHandler, useEffect, useRef, useState} from 'react';
import './App.css';
import Show from "./components/Show";
import Tree from "./components/Tree";
import {JSON, objectToJSON, parse} from "./utils/parse";

const dataG = objectToJSON(require("../src/static/category.json"));

let diffAX:number[] = new Array<number>();
let percent:number = 50;

const App = () => {

    useEffect(() => {
        diffAX.push(window.screen.width/2);
        diffAX.push(window.screen.width/2);
    },[])

    const [clickedData,setClickedData] = useState<JSON>(dataG);

    let midRef = useRef(null);
    let left = useRef(null);

    const handleMoseDown = (event: any) => {
        console.log(event)
        let tree = document.getElementById("Tree");
        let show = document.getElementById("Show");
        let canvas = document.getElementsByTagName("canvas")[0];

        if (midRef.current != null && tree != null && show != null && canvas != null) {
            let temp:HTMLImageElement = midRef.current
            let width = window.screen.width;
            console.log(width);
            temp.onmousemove = (e:MouseEvent) => {
                tree!.style.width = `${e.clientX}px`;
                show!.style.width = `${width - 5 - e.clientX}px`;
            }
            temp.onmouseup = () => {
                console.log("leave")
                temp.onmousemove = null;
            }
        }

    }

  return (
    <div className="App">
        <Tree setClickedData={setClickedData}/><div className={"mid"}><img ref={midRef} onMouseDown={handleMoseDown} src={require("./static/lr.png")} alt={"no"}/></div><Show clickedData={clickedData}/>
    </div>
  );
}

export { dataG }

export default App;
