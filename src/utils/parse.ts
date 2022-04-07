
class JSON {
    id: string;
    level:number;
    all_count:number;
    cur_count:number;
    children: JSON[]
    constructor(name:string, level:number, all_count:number,cur_count:number,sons:JSON[]) {
        this.children = sons;
        this.id = name;
        this.level = level;
        this.all_count = all_count;
        this.cur_count = cur_count;
    }
}

interface Node {
    name:string;
    level:number;
    all_count:number;
    cur_count:number;
    sons: Node[];
    parent: Node;
}

interface Edge {
    from:Node;
    to:Node;
}

const objectToJSON = (input:any):JSON =>{
    if (input.sons.length !== 0) {
        let sons:JSON[] = new Array<JSON>();
        input.sons.forEach((s:any) => {
            let son:JSON = objectToJSON(s);
            sons.push(son);
        })
        let now:JSON = new JSON(input.name,input.level,input.all_count,input.cur_count,sons);
        return now;
    } else {
        let now:JSON = new JSON(input.name,input.level,input.all_count,input.cur_count,new Array<JSON>());
        return now;
    }
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

export {parse,objectToJSON};
export type { JSON, Node, Edge };

