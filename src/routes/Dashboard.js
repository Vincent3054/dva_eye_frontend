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
      const { visibleDelete, visibleEdit, confirmLoading, ModalTextDelete } = this.state;
      const { Option } = Select;
      const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 13,
        },
      };

      const LineData = [
        { year: '11/25', value: 13 },
        { year: '11/26', value: 7 },
        { year: '11/27', value: 3 },
        { year: '11/28', value: 4 },
        { year: '11/29', value: 3 },
      ];
      var LineConfig = {
        height: 250,
        data: LineData,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: { showMarkers: false },
        state: {
          active: {
            style: {
              shadowColor: 'yellow',
              shadowBlur: 4,
              stroke: 'transparent',
              fill: 'red',
            },
          },
        },
        theme: {
          geometries: {
            point: {
              diamond: {
                active: {
                  style: {
                    shadowColor: '#FCEBB9',
                    shadowBlur: 2,
                    stroke: '#F6BD16',
                  },
                },
              },
            },
          },
        },
        interactions: [{ type: 'marker-active' }],
      };

      var PieData = [
        {
          type: '坐姿',
          value: 33,
        },
        {
          type: '環境',
          value: 7,
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
          value: 13,
        },
        {
          year: '眼睛位置低於電腦畫面	',
          value: 8,
        },
        {
          year: '環境光線太過昏暗	',
          value: 4,
        },
        {
          year: '眼睛離電腦螢幕距離太遠',
          value: 3,
        },
        {
          year: '腳底未平放在地面上',
          value: 1,
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
          type: '分类一',
          value: 27,
        },
        {
          type: '分类二',
          value: 25,
        },
        {
          type: '分类三',
          value: 18,
        },
        {
          type: '分类四',
          value: 15,
        },
        {
          type: '分类五',
          value: 10,
        },
        {
          type: '其他',
          value: 5,
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
          value: 35,
        },
        {
          time: '11/21',
          value: 90,
        },
        {
          time: '11/22',
          value: 30,
        },
        {
          time: '11/23',
          value: 45,
        },
        {
          time: '11/24',
          value: 47,
        },
        {
          time: '11/25',
          value: 35,
        },
        {
          time: '11/26',
          value: 90,
        },
        {
          time: '11/27',
          value: 30,
        },
        {
          time: '11/28',
          value: 45,
        },
        {
          time: '11/29',
          value: 47,
        },
      ];
      var transformData = [
        {
          time: '11/20',
          count: 800,
          name: 'a',
        },
        {
          time: '11/21',
          count: 600,
          name: 'a',
        },
        {
          time: '11/22',
          count: 400,
          name: 'a',
        },
        {
          time: '11/23',
          count: 380,
          name: 'a',
        },
        {
          time: '11/24',
          count: 220,
          name: 'a',
        },
        {
          time: '11/21',
          count: 750,
          name: 'b',
        },
        {
          time: '11/22',
          count: 650,
          name: 'b',
        },
        {
          time: '11/23',
          count: 450,
          name: 'b',
        },
        {
          time: '11/24',
          count: 400,
          name: 'b',
        },
        {
          time: '11/25',
          count: 320,
          name: 'b',
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
            <Col span={8}>
              <Card title="警示次數" bordered={false} style={{ width: 500 }}>
                <Line {...LineConfig} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="類別比例" bordered={false} style={{ width: 500 }}>
                <Pie {...PieConfig} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="前五名常出現的類別" bordered={false} style={{ width: 500 }}>
                <Bar  {...BarConfig} />
              </Card>
            </Col>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Col span={8}>
              <Card title="1" bordered={false} style={{ width: 500 }}>
                <Pie {...Pie2Config} />
              </Card>
            </Col>
            <Col span={16}>
              <Card title="2" bordered={false} style={{ width: 1000 }}>
                <DualAxes {...DualAxesConfig} />
              </Card>
            </Col>
          </Row>
        </Layout>

      )
    }
  }
)
