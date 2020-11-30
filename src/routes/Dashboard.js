import React, { Component } from "react";
import Layout from '../layouts/layout';
import { connect } from 'dva';
import { Form, Input, Select, Table, Space, Modal, Button, Col, Row, Tag, Card } from 'antd';
import { values } from "lodash";
import warning from "../Assets/warning.png";
import test1 from "../Assets/test1.png"
import notebooknew from "../Assets/notebooknew.png"
import { Line, Pie, Bar } from '@ant-design/charts';

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
      const dataSource = [
        {
          key: '1',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Tag: '坐姿',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '2',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Tag: '坐姿',
          Time: '2020/11/29 下午02:20:15',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '3',
          img: '警示圖',
          Name: '環境光線太過昏暗',
          Time: '2020/11/29 下午02:18:03',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '4',
          img: '警示圖',
          Name: '腳底未平放在地面上',
          Tag: '坐姿',
          Time: '2020/11/28 上午10:25:05',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '5',
          img: '警示圖',
          Name: '桌面和地面的距離太高',
          Time: '2020/11/28 上午10:19:35',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '6',
          img: '警示圖',
          Name: '椅子高度太低',
          Time: '2020/11/28 上午10:18:28',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '7',
          img: '警示圖',
          Name: '桌面和地面的距離太低',
          Time: '2020/11/28 上午10:10:02',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '8',
          img: '警示圖',
          Name: '椅子高度太高',
          Time: '2020/11/27 下午07:55:13',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '9',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太遠',
          Time: '2020/11/27 下午07:20:50',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '10',
          img: '警示圖',
          Name: '眼睛位置高於電腦畫面',
          Time: '2020/11/27 下午07:15:03',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '11',
          img: '警示圖',
          Name: '眼睛位置高於電腦畫面',
          Time: '2020/11/26 下午02:25:15',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '12',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '13',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '14',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '15',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '16',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '17',
          img: '警示圖',
          Name: '環境光線太過昏暗',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '18',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '19',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '20',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '21',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '22',
          img: '警示圖',
          Name: '眼睛離電腦螢幕距離太近',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '23',
          img: '警示圖',
          Name: '環境光線太過昏暗',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['環境'],
        },
        {
          key: '24',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '25',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '26',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '27',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '28',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '29',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '30',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
        {
          key: '31',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Time: '2020/11/29 下午02:25:56',
          img: warning,
          tags: ['坐姿'],
        },
      ];

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
          
        </Layout>

      )
    }
  }
)
