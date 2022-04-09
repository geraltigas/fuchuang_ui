import {dataG} from "../App";
import {JSON, NodesAndEdges, vDataToNodes} from "../utils/parse";
import {useContext, useEffect, useState} from "react";
import Graphin, {GraphinContext, IG6GraphEvent} from "@antv/graphin";
import {INode} from "@antv/g6";

const type = 'dagre';

const options = {
    direction: 'TB', // H / V / LR / RL / TB / BT
    nodeSep: 40,
    rankSep: 100,
};

interface TreeProps {
    setDataClickedG:(json:JSON) => void;
}

interface OnClickBehaviorProps {
    setDataToShow: (vJ:VData)=>void,
    setDataClickedG: (json:JSON) => void,
    data:VData;
    setTempNode: (tempNode:NodesAndEdges) => void;
}

class VData {
    father:VData;
    children: VData[];
    reflect: number[];
    constructor(father:VData, children:VData[],reflect:number) {
        if (father == null) {
            this.father = null as any as VData;
        }else {
            this.father = father;
        }
        this.children = children;
        if (reflect == null) {
            this.reflect = new Array<number>();
        }else {
            this.reflect = [...father.reflect];
            this.reflect.push(reflect);
        }
    };
}

const OnClickBehavior = (props:OnClickBehaviorProps) => {
    const { setDataClickedG,setTempNode} = props;
    const { graph, apis } = useContext(GraphinContext);

    useEffect(() => {
        apis.focusNodeById('所有商品');
        const handleClick = (evt: IG6GraphEvent) => {
            const node = evt.item as INode;
            const model = node.getModel() as any;
            console.log(model)
            let modelV = model.reflect as VData;
            let dj:JSON = dataG;
            modelV.reflect.forEach((index:number) => {
                dj = dj.children[index]
            })
            console.log(dj)
            console.log(modelV)
            apis.focusNodeById(dj.id);
            if(modelV.children.length !== 0) {
                modelV.children.splice(0,modelV.children.length)
            }else {
                dj.children.forEach((js:JSON,index:number) => {
                    modelV.children.push(new VData(modelV,new Array<VData>(),index))
                })
            }
            setDataClickedG(dj);
            console.log(modelV)
            setTempNode(vDataToNodes(modelV));
            // setDataClickedG(modelV.reflect);
            // if (modelV.children.length === 0) {
            //     modelV.reflect.children.forEach((json:JSON,index) => {
            //         let add = new vJSON(json.id,json.level,json.all_count,json.cur_count,new Array<vJSON>(),json,modelV)
            //         modelV.children.push(add);
            //     })
            // }else {
            //     modelV.children.splice(0,modelV.children.length);
            // }
            // while (modelV.id !== '所有商品') {
            //     modelV = modelV.father;
            // }
            // console.log(modelV)
            // setDataToShow(modelV)
        };
        graph.on('node:click', handleClick);
        return () => {
            graph.off('node:click', handleClick);
        };
    },[])
    return null;
};

const Tree = (props:TreeProps) => {

    const { setDataClickedG } = props

    const [vData,setVData] = useState<VData>(new VData(null as any as VData,new Array<VData>(),null as any as number));

    const [tempNode,setTempNode] = useState<NodesAndEdges>(new NodesAndEdges());

    useEffect(() => {
       setTempNode(vDataToNodes(vData));
    },[])

    return (
        <div id={'Tree'}>
            <Graphin isTree={true} data={tempNode} layout={{type, ...options}} fitView>
                <OnClickBehavior setTempNode={setTempNode} data={vData} setDataClickedG={setDataClickedG} setDataToShow={setVData} />
            </Graphin>
        </div>
    )

}

export {VData}

export default Tree;
