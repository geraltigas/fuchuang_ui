import Graphin, {Utils, Behaviors, IG6GraphEvent, GraphinContext} from '@antv/graphin';
import {JSON, objectToJSON} from "../utils/parse";
import {useContext, useEffect, useState} from "react";
import {dataG} from "../App";
import {INode} from "@antv/g6";
import {Steps} from "antd";


interface TreeProps {
    setClickedData:(json:JSON) => void;
}

const type = 'dendrogram';


const options = {
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 40,
        rankSep: 100,
};

interface OnClickBehaviorProps {
setNowAt: (json:JSON) => void;
setStack: (json:JSON[]) => void;
stack: JSON[];
setCurrent: (index:number) => void;
current: number;
}

let currentN  = 0;

const OnClickBehavior = (props:OnClickBehaviorProps) => {
    const { setNowAt,setStack,stack,setCurrent,current } = props;
    const { graph, apis } = useContext(GraphinContext);

    useEffect(() => {
        const handleClick = (evt: IG6GraphEvent) => {
            const node = evt.item as INode;
            const model = node.getModel() as any as JSON;
            apis.focusNodeById(model.id);
            setNowAt(model.reflect!);
            if (stack[stack.length-1].id === model.reflect!.id) {
            }else {
                stack.splice(currentN+1,stack.length)
                    stack.push(model.reflect!)
                    setStack([...stack]);
                    setCurrent(currentN+1);
                    currentN++;
            }

        };
        graph.on('node:click', handleClick);
        return () => {
            graph.off('node:click', handleClick);
        };
    },[])
    return null;
};

const getNow = (now:JSON) => {
    let sons:JSON[] = new Array<JSON>();
    now.children.forEach((json:JSON) => {
        let temp = new JSON(json.id,json.level,json.all_count,json.cur_count,new Array<JSON>())
        temp.reflect = json;
        temp.style = {
            label: {
                value: temp.id
            }
        }
        sons.push(temp);
    })
    let temp = new JSON(now.id,now.level,now.all_count,now.cur_count,sons);
    temp.reflect = now
    temp.style = {
        label: {
            value: temp.id
        }
    }
    return temp
}

const Tree = (props:TreeProps) => {

    const {setClickedData} = props

    const [nowAt,setNowAt] = useState<JSON>(dataG);
    const [stack,setStack] = useState<JSON[]>(new Array<JSON>())
    const [current,setCurrent] = useState<number>(0);

    useEffect(() => {
        setStack([...stack,dataG]);
    },[])

    useEffect(() => {
        setClickedData(nowAt)
    },[nowAt])

    const onChange = (current:number) => {
        setCurrent(current);
        currentN = current;
        setNowAt(stack[current]);
        if (currentN !== stack.length-1) {
            stack.splice(currentN+1,stack.length);
        }
        setStack(stack)
    }

    return (
        <div id={'Tree'}>
            <div className={'Steps'}>
                <Steps current={current} progressDot onChange={onChange} direction="vertical">
                    {stack.map((json:JSON,index:number) => {
                        return (
                            <Steps.Step title={json.id} key={index}/>
                        )
                    })}
                </Steps>
            </div>
            <Graphin data={getNow(nowAt) as any} layout={{type, ...options}} fitView>
                <OnClickBehavior stack={stack} setStack={setStack} setNowAt={setNowAt} setCurrent={setCurrent} current={current}/>
            </Graphin>
        </div>
    )
}

export default Tree;
