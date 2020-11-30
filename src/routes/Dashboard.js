import React, { Component } from "react";
import Layout from '../layouts/layout';
import { connect } from 'dva';
import { Form, Input, Select, Table, Space, Modal, Button, Col, Row, Tag, Card } from 'antd';
import { values } from "lodash";
import warning from "../Assets/warning.png";
import test1 from "../Assets/test1.png"
import notebooknew from "../Assets/notebooknew.png"
import { Line, Pie, Bar, DualAxes } from '@ant-design/charts';

const mapStateToProps = state => {
  return {
    members: state.member.members !== null ? state.member.members : [],
    message: state.member.message !== null ? state.member.message : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GET_members(callback, loading) {
      dispatch({ type: 'member/GET_members', callback, loading });
    },
    Delete_members(payload, callback, loading) {
      dispatch({ type: 'member/Delete_members', payload, callback, loading });
    },
    Edit_members(payload, callback, loading, data) {
      dispatch({ type: 'member/Edit_members', payload, callback, loading, data });
    },
  };
};



//GET_members 和下面是相呼應的
//dispatch 是方法 用來發送物件
//type 對應到 effects 的方法
//*都在prpos 呼叫方法


export default connect(
  mapStateToProps, mapDispatchToProps
)(
  class Dashboard extends Component {
    state = {
      ModalTextDelete: '確認要刪除會員資料嗎?',
      visibleDelete: false,
      visibleEdit: false,
      confirmLoading: false,
      Account: "",
    };


    //antd裡面table組件 放東西進去
    //table 裡面只接受陣列物件
    render() {
      var PieData = [
        {
          type: '坐姿',
          value: 99,
        },
        {
          type: '環境',
          value: 21,
        },
      ];

      var PieConfig = {
        height: 250,
        appendPadding: 10,
        data: PieData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: function formatter(v) {
              return ''.concat(v, '次');
            },
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          style: { textAlign: 'center' },
          autoRotate: false,
          content: '{value}',
        },
        interactions: [
          { type: 'element-selected' },
          { type: 'element-active' },
          { type: 'pie-statistic-active' },
        ],
      };

      var BarData = [
        {
          year: '眼睛離電腦螢幕距離太近	',
          value: 29,
        },
        {
          year: '眼睛位置低於電腦畫面	',
          value: 24,
        },
        {
          year: '環境光線太過昏暗	',
          value: 16,
        },
        {
          year: '眼睛離電腦螢幕距離太遠',
          value: 9,
        },
        {
          year: '腳底未平放在地面上',
          value: 7,
        },
      ];

      var BarConfig = {
        height: 250,
        data: BarData,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: { position: 'top-left' },
      };

      var Pie2Data = [
        {
          type: '眼睛離電腦螢幕距離太近',
          value: 24,
        },
        {
          type: '眼睛位置低於電腦畫面	',
          value: 20,
        },
        {
          type: '環境光線太過昏暗',
          value: 13,
        },
        {
          type: '眼睛離電腦螢幕距離太遠',
          value: 7,
        },
        {
          type: '腳底未平放在地面上',
          value: 6,
        },
        {
          type: '其他',
          value: 30,
        },
      ];

      var Pie2Config = {
        appendPadding: 10,
        data: Pie2Data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
      };

      var uvData = [
        {
          time: '11/20',
          value: 14,
        },
        {
          time: '11/21',
          value: 18,
        },
        {
          time: '11/22',
          value: 17,
        },
        {
          time: '11/23',
          value: 14,
        },
        {
          time: '11/24',
          value: 17,
        },
        {
          time: '11/25',
          value: 16,
        },
        {
          time: '11/26',
          value: 10,
        },
        {
          time: '11/27',
          value: 7,
        },
        {
          time: '11/28',
          value: 4,
        },
        {
          time: '11/29',
          value: 3,
        },
      ];
      var transformData = [
        {
          time: '11/20',
          count: 2,
          name: '坐姿',
        },
        {
          time: '11/21',
          count: 3,
          name: '坐姿',
        },
        {
          time: '11/22',
          count: 3,
          name: '坐姿',
        },
        {
          time: '11/23',
          count: 2,
          name: '坐姿',
        },
        {
          time: '11/24',
          count: 3,
          name: '坐姿',
        },
        {
          time: '11/25',
          count: 3,
          name: '坐姿',
        },
        {
          time: '11/26',
          count: 2,
          name: '坐姿',
        },
        {
          time: '11/27',
          count: 1,
          name: '坐姿',
        },
        {
          time: '11/28',
          count: 1,
          name: '坐姿',
        },
        {
          time: '11/29',
          count: 1,
          name: '坐姿',
        },
        {
          time: '11/20',
          count: 12,
          name: '環境',
        },
        {
          time: '11/21',
          count: 15,
          name: '環境',
        },
        {
          time: '11/22',
          count: 14,
          name: '環境',
        },
        {
          time: '11/23',
          count: 10,
          name: '環境',
        },
        {
          time: '11/24',
          count: 14,
          name: '環境',
        },
        {
          time: '11/25',
          count: 13,
          name: '環境',
        },
        {
          time: '11/26',
          count: 8,
          name: '環境',
        },
        {
          time: '11/27',
          count: 6,
          name: '環境',
        },
        {
          time: '11/28',
          count: 3,
          name: '環境',
        },
        {
          time: '11/29',
          count: 2,
          name: '環境',
        },
      ];

      var DualAxesConfig = {
        data: [uvData, transformData],
        xField: 'time',
        yField: ['value', 'count'],
        geometryOptions: [
          {
            geometry: 'column',
            columnWidthRatio: 0.4,
          },
          {
            geometry: 'line',
            seriesField: 'name',
          },
        ],
      };

      return (
        <Layout>
          <Row style={{ marginBottom: 30 }}>
            <Col span={16}>
              <Card title="最常出現的警示狀態" bordered={false} style={{ width: 1040 }}>
                <Bar  {...BarConfig} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="類別比例" bordered={false} style={{ width: 530 }}>
                <Pie {...PieConfig} />
              </Card>
            </Col>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Col span={10}>
              <Card title="警示狀態比例" bordered={false} style={{ width: 660 }}>
                <Pie {...Pie2Config} />
              </Card>
            </Col>
            <Col span={14}>
              <Card title="人數狀態區間圖" bordered={false} style={{ width: 940 }}>
                <DualAxes {...DualAxesConfig} />
              </Card>
            </Col>
          </Row>
        </Layout>

      )
    }
  }
)
