// import Graphin, {Utils, Behaviors, GraphinTreeData, G6, GraphinContext, IG6GraphEvent} from '@antv/graphin';
// import {JSON, objectToJSON, vJSONToNodes} from "../utils/parse";
// import {useContext, useEffect, useState} from "react";
// import {INode, NodeConfig} from "@antv/g6";
// import {data} from "../App";
// const { TreeCollapse } = Behaviors;
//
//
// interface TreeProps {
//     data: JSON;
//     setDataClickedG: (json: JSON) => void;
// }
//
// const datasss = Utils.mock(10).circle().graphin();
//
// console.log(datasss)
//
// class vJSON extends JSON {
//     reflect: JSON;
//     father: vJSON;
//     children: vJSON[];
//     constructor(name:string, level:number, all_count:number,cur_count:number,children:vJSON[],reflect: JSON,father:vJSON) {
//         super(name, level, all_count,cur_count,children);
//         this.children = children;
//         this.reflect = reflect;
//         this.father = father;
//     }
// }
//
// const type = 'dagre';
//
// const options = {
//         direction: 'TB', // H / V / LR / RL / TB / BT
//         nodeSep: 40,
//         rankSep: 100,
// };
//
// const walk = (node: JSON, callback: (node: any) => void) => {
//     callback(node);
//     if (node.children && node.children.length > 0) {
//         node.children.forEach(child => {
//             walk(child, callback);
//         });
//     }
// };
//
// interface OnClickBehaviorProps {
//     setDataToShow: (vJ:vJSON)=>void,
//     setDataClickedG: (json:JSON) => void,
//     hotLoad: () => void;
// }
//
// const OnClickBehavior = (props:OnClickBehaviorProps) => {
//     const { setDataToShow,setDataClickedG} = props;
//     const { graph, apis } = useContext(GraphinContext);
//
//     useEffect(() => {
//         apis.focusNodeById('所有商品');
//
//         const handleClick = (evt: IG6GraphEvent) => {
//             const node = evt.item as INode;
//             const model = node.getModel() as any;
//             let modelV = model.reflect as vJSON;
//             setDataClickedG(modelV.reflect);
//             if (modelV.children.length === 0) {
//                 modelV.reflect.children.forEach((json:JSON,index) => {
//                     let add = new vJSON(json.id,json.level,json.all_count,json.cur_count,new Array<vJSON>(),json,modelV)
//                     modelV.children.push(add);
//                 })
//             }else {
//                 modelV.children.splice(0,modelV.children.length);
//             }
//             while (modelV.id !== '所有商品') {
//                 modelV = modelV.father;
//             }
//             console.log(modelV)
//             setDataToShow(modelV)
//         };
//         graph.on('node:click', handleClick);
//         return () => {
//             graph.off('node:click', handleClick);
//         };
//     },[])
//     return null;
// };
//
// const TreeC = (props:TreeProps) => {
//
//     const { setDataClickedG} = props;
//
//     const [dataToShow,setDataToShow] = useState<vJSON>(new vJSON("所有商品",0,4412335,598193,new Array<vJSON>(),data,null as any as vJSON));
//
//     useEffect(() => {
//         console.log("the init data",dataToShow)
//     },[])
//
//     walk(dataToShow, node => {
//         node.style = {
//             label: {
//                 value: node.id,
//             },
//         };
//     });
//
//     const hotLoad = () => {
//
//     }
//
//     return (
//         <div id={'TreeC'}>
//             <Graphin isTree={true} data={vJSONToNodes(dataToShow)} layout={{type, ...options}} fitView>
//                 <OnClickBehavior hotLoad={hotLoad} setDataClickedG={setDataClickedG} setDataToShow={setDataToShow} />
//             </Graphin>
//         </div>
//     )
// }
//
// // export {vJSON}
export {}
//
// // export default TreeC;
