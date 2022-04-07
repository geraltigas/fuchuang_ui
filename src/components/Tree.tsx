import Graphin, { Utils,Behaviors } from '@antv/graphin';
import {JSON, objectToJSON} from "../utils/parse";
import {useEffect, useState} from "react";
const { TreeCollapse } = Behaviors;


interface TreeProps {
    data: JSON;
}

const type = 'dendrogram';

const data2 = Utils.mock(20).tree().graphinTree();

const options = {
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 40,
        rankSep: 100,
};

const title = "生态树"

let dataL:any;

const Tree = (props:TreeProps) => {
    // const {data} = props;
    // console.log(typeof data);

    const [isOk,setIsOk] = useState<boolean>(false);
    const [data,setData] = useState(null);

    useEffect(() => {
        dataL = objectToJSON(require("../static/category.json"));
    },[])

    // let ins = setInterval(() => {
    //     if (dataL != null){
    //         setData(dataL);
    //         clearInterval(ins);
    //     }
    // },100)
    let shows;

    // let inss = setInterval(()=> {
    //     if (data != null) {
    //         setIsOk(true);
    //         clearInterval(inss)
    //     }
    // },100)

    if (isOk === isOk) {
        console.log(isOk)
        console.log(data)

        // @ts-ignore
        shows = (<Graphin isTree={true} data={data2} layout={{type, ...options}} fitView>
                <TreeCollapse/>
            </Graphin>
        )
        // console.log(shows);
    }else {
        shows = <div>loading</div>
    }

    return (
        <div id={'Tree'}>
            {shows}
        </div>
    )
}

export default Tree;
