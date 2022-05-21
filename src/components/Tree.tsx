import Graphin, { Utils, Behaviors, IG6GraphEvent, GraphinContext } from '@antv/graphin';
import { JSON, objectToJSON } from "../utils/parse";
import { useContext, useEffect, useState } from "react";
import { dataG } from "../App";
import { INode } from "@antv/g6";
import { Steps } from "antd";


interface TreeProps {
    setClickedData: (json: JSON) => void;
}

const type = 'compactBox';


const options = {
    direction: 'LR',
    getId: function getId(d: { id: any; }) {
        return d.id;
    },
    getHeight: function getHeight() {
        return 26;
    },
    getWidth: function getWidth() {
        return 26;
    },
    getVGap: function getVGap() {
        return 26;
    },
    getHGap: function getHGap() {
        return 100;
    }
}

interface OnClickBehaviorProps {
    setNowAt: (json: JSON) => void;
    setStack: (json: JSON[]) => void;
    stack: JSON[];
    setCurrent: (index: number) => void;
}

let currentN = 0;
let stackN: JSON[] = [];
let custom = {
    size: 30,
    stroke: '#1890ff',
    fill: '#1890ff',
    fillOpacity: 0.2,
}
let customR = {
    size: 50,
    stroke: 'blue',
    fill: 'blue',
    fillOpacity: 0.2,
}

const OnClickBehavior = (props: OnClickBehaviorProps) => {
    const { setNowAt, setStack, setCurrent } = props;
    const { graph, apis } = useContext(GraphinContext);

    useEffect(() => {
        const handleClick = (evt: IG6GraphEvent) => {
            const node = evt.item as INode;
            const model = node.getModel() as any as JSON;
            apis.focusNodeById(model.id);
            setNowAt(model.reflect!);
            let isOld: boolean = false;
            let notOther: boolean = true;
            let isLastAndOther: boolean = false;
            stackN.forEach((json: JSON) => {
                if (json.id === model.id) isOld = true;
            })
            stackN[stackN.length - 1].children.forEach((json: JSON, index: number) => {
                if (json.id === model.id) notOther = false;
            })

            let last:JSON = stackN[stackN.length-1]
            let isBro:boolean = false;

            console.log(stackN[stackN.length-1])

            if (stackN.length > 3) {
                stackN[stackN.length-2].children.forEach((json: JSON, index: number) => {
                    if (json.id === last.id && json.id !== model.id) isBro = true;
                })
            }

            if (stackN[stackN.length-1].level === model.level && isBro) {  //
                isLastAndOther = true;
            }


            if (!isLastAndOther) {
                if (isOld || notOther) {
                    if (isOld) {
                        console.log('isOld')
                        stackN.splice(model.level+1, stackN.length)
                        setCurrent(model.level);
                        currentN = model.level;
                        setStack([...stackN]);
                    }
                    if (notOther) {
                        console.log("notOther")
                        // let temp = model
                        // stackN = []
                        // while(temp != null) {
                        //     stackN.unshift(temp)
                        //     temp = temp.parent
                        // }
                        // setCurrent(model.level);
                        // currentN = model.level;
                        // setStack([...stackN]);
                    }
                } else {
                    stackN.push(model.reflect!)
                    setStack([...stackN]);
                    setCurrent(currentN+1);
                    currentN++;
                }
            }else {
                console.log("isLastAndOther")
                stackN.pop()
                stackN.splice(currentN + 1, stackN.length)
                stackN.push(model.reflect!)
                setStack([...stackN]);
                stackN = [...stackN];
                setCurrent(currentN);
            }





        };
        graph.on('node:click', handleClick);
        return () => {
            graph.off('node:click', handleClick);
        };
    }, [])
    return null;
};

const getNow = (now: JSON) => {
    let sons: JSON[] = new Array<JSON>();
    now.children.forEach((json: JSON) => {
        let temp = new JSON(json.id, json.level, json.all_count, json.cur_count, new Array<JSON>(),json.abno_sales_count,json.abno_sales_count,json.abno_price_items,json.abno_sales_items,json.price_mean,json.price_std,json.price_high_std,json.price_t,
        json.amount_mean,json.amount_std,json.amount_high_std,json.amount_t)
        temp.reflect = json;
        temp.style = {
            label: {
                value: temp.id,
            },
            keyshape: custom
        }
        sons.push(temp);
    })
    let temp = new JSON(now.id, now.level, now.all_count, now.cur_count, sons,now.abno_sales_count,now.abno_sales_count,now.abno_price_items,now.abno_sales_items,now.price_mean,now.price_std,now.price_high_std,now.price_t,
        now.amount_mean,now.amount_std,now.amount_high_std,now.amount_t)
    temp.reflect = now
    temp.style = {
        label: {
            value: temp.id,
        },
        keyshape: customR
    }
    return temp

}

const getNowFromStack = (current: number, stack: JSON[]): JSON => {
    if (stack.length === 0) return null as any as JSON;
    let temp: JSON[] = new Array<JSON>();
    for (let i = 0; i <= current; i++) {
        temp.push(getNow(stack[i]))
    }
    for (let i = 0; i < temp.length - 1; i++) {
        let head = temp[i];
        let rear = temp[i + 1];

        for (let k = 0; k < head.children.length; k++) {
            if (head.children[k].id === rear.id) {
                head.children[k] = rear;
                break;
            }
        }
    }
    return temp[0];

}

const Tree = (props: TreeProps) => {

    const { setClickedData } = props

    const [nowAt, setNowAt] = useState<JSON>(dataG);
    const [stack, setStack] = useState<JSON[]>([dataG])
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        setClickedData(nowAt)
    }, [nowAt])

    useEffect(() => {
        stackN = [dataG]
    }, [])

    const onChange = (current: number) => {
        setCurrent(current);
        currentN = current;
        setNowAt(stack[current]);
        if (currentN !== stack.length - 1) {
            stack.splice(currentN + 1, stack.length);
        }
        setStack(stack)
        stackN = [...stack]
    }

    return (
        <div id={'Tree'}>
            <div className={'Steps'}>
                <Steps current={current} progressDot onChange={onChange} direction="vertical">
                    {stack.map((json: JSON, index: number) => {
                        return (
                            <Steps.Step title={json.id} key={index} />
                        )
                    })}
                </Steps>
            </div>
            {/* <div className={"graphin"}> */}
                <Graphin data={getNowFromStack(current, stack) as any} layout={{ type, ...options }} fitView>
                    <OnClickBehavior stack={stack} setStack={setStack} setNowAt={setNowAt} setCurrent={setCurrent} />
                </Graphin>
            {/* </div> */}
        </div>
    )
}

export default Tree;
