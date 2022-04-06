import React from 'react';
import Graphin, { Behaviors } from '@antv/graphin';
import { Row, Col, Card } from 'antd';

const data = {
    nodes: [
        {
            id: 'node-0',
            x: 100,
            y: 100,
        },
        {
            id: 'node-1',
            x: 200,
            y: 200,
        },
        {
            id: 'node-2',
            x: 100,
            y: 300,
        },
    ],
    edges: [
        {
            source: 'node-0',
            target: 'node-1',
        },
    ],
};

const { ZoomCanvas } = Behaviors;

const Test = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="可视化结果">
                        <Graphin data={data} layout={{ type: 'preset' }}>
                            <ZoomCanvas disabled />
                        </Graphin>
                    </Card>
                </Col>
            </Row>
        </div>
    );

};

export default Test;
