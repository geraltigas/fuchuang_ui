
class JSON {
    id: string;
    level: number;
    all_count: number;
    cur_count: number;
    children: JSON[]
    style: { label: { value: string }; keyshape: {}; } | undefined;
    reflect: JSON | undefined;
    abno_sales_count: number;
    abno_price_count: number;
    abno_price_items: Item[];
    abno_sales_items: Item[];
    constructor(name: string, level: number, all_count: number, cur_count: number, sons: JSON[], abno_price_count: number,
        abno_sales_count: number,
        abno_price_items: Item[],
        abno_sales_items: Item[]) {
        this.children = sons;
        this.id = name;
        this.level = level;
        this.all_count = all_count;
        this.cur_count = cur_count;
        this.abno_price_count = abno_price_count;
        this.abno_sales_count = abno_sales_count;
        this.abno_price_items = abno_price_items;
        this.abno_sales_items = abno_sales_items;
    }
}
class Item {
    month: string;
    name: string;
    price: number;
    sales: number;
    constructor(month: string, name: string, price: number, sales: number) {
        this.month = month;
        this.name = name;
        this.price = price;
        this.sales = sales;
    }
}
interface Node {
    name: string;
    level: number;
    all_count: number;
    cur_count: number;
    sons: Node[];
    parent: Node;
}

interface Edge {
    from: Node;
    to: Node;
}
const obejctToItem = (input: any) => {
    let item = new Item(input.DATA_MONTH, input.ITEM_NAME, input.ITEM_PRICE, input.ITEM_SALES_VOLUME);
    return item;
}

const objectToJSON = (input: any): JSON => {
    //解析JSON中的Items
    let priceItems: Item[] = new Array<Item>();
    input.abno_price_items.forEach(
        (s: any) => priceItems.push(obejctToItem(s))
    )
    let salesItems: Item[] = new Array<Item>();
    input.abno_sales_items.forEach(
        (s: any) => salesItems.push(obejctToItem(s))
    )
    //每一个子节点都要objectToJSON一下
    if (input.sons.length !== 0) {
        let sons: JSON[] = new Array<JSON>();
        input.sons.forEach((s: any) => {
            let son: JSON = objectToJSON(s);
            sons.push(son);
        })

        let now: JSON = new JSON(input.name, input.level, input.all_count, input.cur_count, sons, input.abno_price_count, input.abno_sales_count,priceItems, salesItems);
        return now;
    } else {
        let now: JSON = new JSON(input.name, input.level, input.all_count, input.cur_count, new Array<JSON>(), input.abno_price_count, input.abno_sales_count, priceItems, salesItems);
        return now;
    }
}

const parse = (json: JSON) => {

    console.log(json)

    let nodes: Node[] = new Array<Node>();
    let edges: Edge[] = new Array<Edge>();

    return {
        nodes: nodes,
        edges: edges
    };
}

export { parse, objectToJSON };
export { JSON };

