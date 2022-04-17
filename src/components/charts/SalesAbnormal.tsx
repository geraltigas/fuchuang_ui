import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { JSON } from '../../utils/parse';
interface salesProps {
  clickedData: JSON;
}
const SalesAbnormal = (props: salesProps) => {
  const { clickedData } = props;
  const data = [];
  let array: JSON[] = clickedData.children;
  function compare(value1: JSON, value2: JSON) {
    if (value1.abno_sales_count < value2.abno_sales_count) {
      return 1;
    } else if (value1.abno_sales_count > value2.abno_sales_count) {
      return -1;
    } else {
      return 0;
    }
  }
  array.sort(compare);
  if(!array.length){
    data.push(
      {
        type: '无子节点',
        value: 0,
      }
    )
  }
  for (let i = 0; i < 6&&i<array.length; i++) {
    if(array[i].abno_sales_count){
      data.push(
        {
          type: array[i].id,
          value: array[i].abno_sales_count,
        }
      )
    }
    if((i==5||i==(array.length-1))&&!data.length){
      data.push(
        {
          type:'无销量异常商品',
          value:0,
        }
      )
    }
  }

  const config = {
    height:180,
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
    //   content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default SalesAbnormal;