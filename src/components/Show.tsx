import { useState } from "react";
import { dataG } from "../App";
import { Card, Col, Row, Table } from 'antd';
import { JSON, objectToJSON, parse } from "../utils/parse";
import PriceAbnormal from "./charts/PriceAbnormal";
import SalesAbnormal from "./charts/SalesAbnormal";
import './Show.css';
interface ShowProps {
    clickedData: JSON;
}
//节点基本信息：节点名，节点深度，商品数量；
const nodeInfoCol = [
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
const priceInfoCol=[
    {
        title: '价格均值',
        dataIndex: 'price_mean',
        key: 'price_mean',
    },
    {
        title: '标准差',
        dataIndex: 'price_std',
        key: 'price_std',
    },
    {
        title: '高位标准差',
        dataIndex: 'price_high_std',
        key: 'price_high_std',
    },
    {
        title: '离散系数',
        dataIndex: 'price_t',
        key: 'price_t',
    },
];
const amountInfoCol=[
    {
        title: '销售额均值',
        dataIndex: 'amount_mean',
        key: 'amount_mean',
    },
    {
        title: '标准差',
        dataIndex: 'amount_std',
        key: 'amount_std',
    },
    {
        title: '高位标准差',
        dataIndex: 'amount_high_std',
        key: 'amount_high_std',
    },
    {
        title: '离散系数',
        dataIndex: 'amount_t',
        key: 'amount_t',
    },
]
const abnoPriceCol = [
    {
        title: '价格异常商品数',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '占比',
        dataIndex: 'proportion',
        key: 'proportion',
    }
];
const abnoSalesCol = [
    {
        title: '销量异常商品数',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '占比',
        dataIndex: 'proportion',
        key: 'proportion',
    }
];
const abnoExemCol = [
    {
        title: '异常类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '上线月份',
        dataIndex: 'month',
        key: 'month',
    },
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '商品销量',
        dataIndex: 'sales',
        key: 'sales',
    },
]
const Show = (props: ShowProps) => {
    const { clickedData } = props;
    const nodeInfo = [];
    const priceInfoData = [];
    const amountInfoData = [];    
    const abnoPriceData = [];
    const abnoSalesData = [];
    const abnoExemData = [];

    nodeInfo.push({
        id: 0,
        nodeName: clickedData.id,
        level: clickedData.level,
        all_count: clickedData.all_count
    });
    priceInfoData.push({
        id:0,
        price_mean:clickedData.price_mean,
        price_std:clickedData.price_std,
        price_high_std:clickedData.price_high_std,
        price_t:clickedData.price_t,
        
    })
    amountInfoData.push({
        id:0,
        amount_mean:clickedData.amount_mean,
        amount_std:clickedData.amount_std,
        amount_high_std:clickedData.amount_high_std,
        amount_t:clickedData.amount_t,
        
    })
    abnoPriceData.push({
        id: 0,
        count: clickedData.abno_price_count,
        proportion: ((clickedData.abno_price_count / clickedData.all_count)*100).toFixed(4)+'%',
    })
    abnoSalesData.push({
        id: 0,
        count: clickedData.abno_sales_count,
        proportion: ((clickedData.abno_sales_count / clickedData.all_count)*100).toFixed(4)+'%',
    })
    for (let i = 0; i < clickedData.abno_price_items.length; i++) {
        abnoExemData.push({
            id: i,
            type: '价格异常',
            month: clickedData.abno_price_items[i].month,
            name: clickedData.abno_price_items[i].name,
            price: clickedData.abno_price_items[i].price,
            sales: clickedData.abno_price_items[i].sales,

        })
    }
    for (let i = 0; i < clickedData.abno_sales_items.length; i++) {
        abnoExemData.push({
            id: i,
            type: '销量异常',
            month: clickedData.abno_sales_items[i].month,
            name: clickedData.abno_sales_items[i].name,
            price: clickedData.abno_sales_items[i].price,
            sales: clickedData.abno_sales_items[i].sales,

        })
    }
    return (
        <div id={'Show'}>
            <div className="nodeInfo">
                <h1>节点基本信息</h1>
                <Table dataSource={nodeInfo} columns={nodeInfoCol} bordered={true} pagination={false} />
            </div>
            
            <div className="charts" >
                <Row >
                    <Col span={12}>
                        <Card bordered={true}>
                            <h1>节点价格信息</h1>
                            <Table dataSource={priceInfoData} columns={priceInfoCol} bordered={true} pagination={false}/>
                            <Table dataSource={abnoPriceData} columns={abnoPriceCol} bordered={true} pagination={false} />
                            <h1>子节点中价格异常商品分布</h1>
                            <PriceAbnormal clickedData={clickedData} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={true}>
                            <h1>节点销售额信息</h1>
                            <Table dataSource={amountInfoData} columns={amountInfoCol} bordered={true} pagination={false}/>
                            <Table dataSource={abnoSalesData} columns={abnoSalesCol} bordered={true} pagination={false} />
                            <h1>子节点中销量异常商品分布</h1>
                            <SalesAbnormal clickedData={clickedData} />
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="example">
                <h1>异常商品示例</h1>
                <Table dataSource={abnoExemData} columns={abnoExemCol} bordered={true} pagination={{ pageSize: 3 }} />
            </div>
        </div>
    )
}

export default Show;
