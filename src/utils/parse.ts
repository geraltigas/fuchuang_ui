import {VData} from "../components/Tree";
import * as fs from "fs";
import {dataG} from "../App";

class JSON {
    id: string;
    level:number;
    all_count:number;
    cur_count:number;
    children: JSON[];
    father:JSON;
    index:number;
    constructor(name:string, level:number, all_count:number,cur_count:number,sons:JSON[],father:JSON,index:number) {
        this.children = sons;
        this.id = name;
        this.level = level;
        this.all_count = all_count;
        this.cur_count = cur_count;
        this.father = father;
        this.index = index;
    }
}

class NodesAndEdges {
    edges: Edge[];
    nodes: Node[];
    constructor() {
        this.edges =  new Array<Edge>();
        this.nodes = new Array<Node>();
    }
    addNode(node:Node) {
        this.nodes.push(node);
    }
    addEdge(edges:Edge) {
        this.edges.push(edges);
    }
}

class Node {
    id:string;
    reflect: VData;
    constructor(data:VData) {
        this.reflect = data;
        let js:JSON = dataG;
        this.reflect.reflect.forEach((index:number) => {
            js = js.children[index];
        })
        this.id = js.id;

    }
}

class Edge {
    source:string;
    target:string;
    constructor(source:string,target:string) {
        this.source = source;
        this.target = target;
    }
}

const walk = (node: VData, callback: (node: any) => void) => {
    callback(node);
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            walk(child, callback);
        });
    }
};

const objectToJSON = (input:any,father:JSON,index:number):JSON =>{
    if (input.sons.length !== 0) {
        let sons:JSON[] = new Array<JSON>();
        input.sons.forEach((s:any,index:number) => {
            let son:JSON = objectToJSON(s,input,index);
            sons.push(son);
        })
        let now:JSON = new JSON(input.name,input.level,input.all_count,input.cur_count,sons,input,index);
        return now;
    } else {
        let now:JSON = new JSON(input.name,input.level,input.all_count,input.cur_count,new Array<JSON>(),father,index);
        return now;
    }
}

// const vJSONToNodes = (json:vJSON):NodesAndEdges => {
//     let nAnde = new NodesAndEdges()
//     console.log("the input data",json)
//
//     let nowA:Node[] = new Array<Node>();
//     let formerA:Node[] = new Array<Node>();
//
//     nowA.push(new Node(json.id,json.id,json));
//
//     while(nowA.length !== 0) {
//         let node:Node|undefined = nowA.pop();
//         node!.reflect.children.forEach((vJ:vJSON) => {
//             let temp:Node = new Node(vJ.id,vJ.id,vJ)
//             formerA.push(temp);
//             nowA.push(temp);
//             nAnde.addEdge(new Edge(node!.id,json.id));
//         })
//         nAnde.addNode(node!);
//     }
//
//     return nAnde;
// }

const vDataToNodes = (data:VData):NodesAndEdges => {
    const nAnde = new NodesAndEdges();

    let nodeN = new Array<Node>();
    let root:Node = new Node(data)
    nodeN.push(root)
    nAnde.addNode(root)

    while (nodeN.length !== 0) {
        let temp:Node|undefined = nodeN.pop();
        temp!.reflect.children.forEach((vData:VData) => {
            let tempNode = new Node(vData);
            nodeN.push(tempNode);
            nAnde.addNode(tempNode);
            nAnde.addEdge(new Edge(temp!.id,tempNode.id))
        })
    }

    nAnde.nodes.forEach((node: any) => {
        node.style = {
            label: {
                value: node.id
            }
        }
    })
    return nAnde;
}

const parse = (json: JSON) => {

    console.log(json)

    let nodes:Node[] = new Array<Node>();
    let edges:Edge[] = new Array<Edge>();

    return {
        nodes:nodes,
        edges:edges
    };
}

export {parse,objectToJSON, Node};
export { JSON ,NodesAndEdges ,vDataToNodes};

