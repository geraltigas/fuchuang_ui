import {JSON, objectToJSON} from "../utils/parse";
interface ShowProps {
    dataClickedG:JSON
}

const Show = (props: ShowProps) => {
    const {dataClickedG} = props;
    // console.log(dataClickedG);
    return (
        <div id={'Show'}>
            this is Show
        </div>
    )
}

export default Show;
