import { useState } from "react";
import { dataG } from "../App";
import { Card, Col, Row, Table } from 'antd';
import { JSON, objectToJSON, parse } from "../utils/parse";
import DemoLine from "./charts/DemoLine";
import PriceAbnormal from "./charts/PriceAbnormal";
import SalesAbnormal from "./charts/SalesAbnormal";
import DemoHistogram from "./charts/Histogram";
import './Show.css';
interface ShowProps {
    clickedData: JSON;
}
//节点基本信息：节点名，节点深度，商品数量；
const columns = [
    {
        title: '节点名',
        dataIndex: 'nodeName',
        key: 'nodeName',
    },
    {
        title: '节点深度',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: '商品数量',
        dataIndex: 'all_count',
        key: 'all_count',
    },
];
const Show = (props: ShowProps) => {
    const { clickedData } = props;
    const data = [];

    data.push({
        id: 0,
        nodeName: clickedData.id,
        level: clickedData.level,
        all_count: clickedData.all_count
    });

    return (
        <div id={'Show'}>
            <div className="nodeInfo">
                <h1>节点基本信息</h1>
                <Table dataSource={data} columns={columns} bordered={true} pagination={false} />
            </div>
            <div className="charts" >
                <Row gutter={[24, 24]}>
                    <Col span={12}>
                        <Card bordered={true}>
                            <h1>价格信息</h1>
                            <DemoHistogram />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={true} >
                            <h1>销量信息</h1>
                            <DemoLine />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[24, 24]}>
                    <Col span={12}>
                        <Card bordered={true}>
                            <h1>价格异常商品</h1>
                            <PriceAbnormal />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={true}>
                            <h1>销量异常商品</h1>
                            <SalesAbnormal />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Show;
