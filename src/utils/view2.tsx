import React, { useEffect } from 'react';

import Grahpin, { Behaviors } from '@antv/graphin';

const { TreeCollapse } = Behaviors;

const walk = (node: { children: any[]; }, callback: { (node: { style: { label: { value: any; }; }; id: any; }): void; (arg0: any): void; }) => {
    callback(node);
    if (node.children && node.children.length !== 0) {
        node.children.forEach(n => {
            walk(n, callback);
        });
    }
};
const CompactBox = () => {
    const [state, setState] = React.useState({
        data: null,
    });
    useEffect(() => {
        // eslint-disable-next-line no-undef
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
            .then(res => res.json())
            .then(res => {
                console.log('data', res);
                walk(res, (node: { style: { label: { value: any; }; }; id: any; }) => {
                    node.style = {
                        label: {
                            value: node.id, // add label
                        },
                    };
                });
                setState({
                    data: res,
                });
            });
    }, []);

    const { data } = state;

    return (
        <div>
            {data && (
                <Grahpin
                    data={data}
                    fitView
                    layout={{
                        type: 'compactBox',
                        direction: 'TB',
                        getId: function getId(d: { id: any; }) {
                            return d.id;
                        },
                        getHeight: function getHeight() {
                            return 16;
                        },
                        getWidth: function getWidth() {
                            return 16;
                        },
                        getVGap: function getVGap() {
                            return 80;
                        },
                        getHGap: function getHGap() {
                            return 50;
                        },
                    }}
                >
                    {/* <FitView /> */}
                    <TreeCollapse trigger="click" />
                </Grahpin>
            )}
        </div>
    );
};

export default CompactBox;
