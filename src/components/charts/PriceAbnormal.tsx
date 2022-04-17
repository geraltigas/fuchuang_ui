import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { JSON } from '../../utils/parse';
interface priceProps {
  clickedData: JSON;
}
const PriceAbnormal = (props: priceProps) => {
  const { clickedData } = props;
  const data = [];
  let children: JSON[] = clickedData.children;
  function compare(value1: JSON, value2: JSON) {
    if (value1.abno_price_count < value2.abno_price_count) {
      return 1;
    } else if (value1.abno_price_count > value2.abno_price_count) {
      return -1;
    } else {
      return 0;
    }
  }
  children.sort(compare);
  if(!children.length){
    data.push(
      {
        type: '无子节点',
        value: 0,
      }
    )
  }
  for (let i = 0; i < 6 && i < children.length; i++) {
    if (children[i].abno_price_count) {
      data.push(
        {
          type: children[i].id,
          value: children[i].abno_price_count,
        }
      )
    }
    if((i==5||i==(children.length-1))&&!data.length){
      data.push(
        {
          type:'无价格异常商品',
          value:0,
        }
      )
    }
  }

  const config = {
    height: 180,
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

export default PriceAbnormal;