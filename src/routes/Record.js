import React, { Component } from "react";
import Layout from '../layouts/Recordlayout';
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
  class Record extends Component {
    state = {
      ModalTextDelete: '確認要刪除會員資料嗎?',
      visibleDelete: false,
      visibleEdit: false,
      confirmLoading: false,
      Account: "",
    };

    componentDidMount = () => {
      const { GET_members } = this.props;
      GET_members(null, true); //開關loading畫面

    }

    showModalDelete = (Account) => {
      this.setState({
        ModalTextDelete: '確認要刪除' + Account + '會員資料嗎?',
        visibleDelete: true,
      });
    };
    handleCancelDelete = () => {
      this.setState({
        visibleDelete: false,
      });
    };
    handleOkDelete = (Account) => {
      const { Delete_members } = this.props;
      this.setState({
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visibleDelete: false,
          confirmLoading: false,
        });
        Delete_members(Account, null, true,);
      }, 1000);
    };

    showModalEdit = (Account, Name, Email, Sex, BirthDate) => {
      this.setState({
        visibleEdit: true,
        Account: Account,
      });
      //const { form } = this.props;
      // //给form赋值
      // const { getFieldValue } = this.props.form;
      //this.props.form.setFieldsValue({
      //  'Name': Name,
      //     'Email': Email,
      //     'Sex': Sex,
      //     'BirthDate': BirthDate,
      //  });
      // this.formRef.current.setFieldsValue({
      //   'Name': '123',
      // });
    };
    handleCancelEdit = () => {
      this.setState({
        visibleEdit: false,
        Account: "",
      });
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
      const validateMessages = {
        required: "${label} is required!",
        types: {
          email: '${label} is not validate email!',
          number: '${label} is not a validate number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      const onFinish = (values) => {
        const { Account } = this.state;
        const { Edit_members } = this.props;
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visibleEdit: false,
            confirmLoading: false,
          });
          Edit_members(Account, null, true, values);
        }, 1000);
      };

      const columns = [
        {
          title: '',
          dataIndex: 'img',
          key: 'img',
          width: 10,
          align: 'right',
          render: img => (
            <img height={25} src={img} style={{ paddingLeft: "100px" }} />
          )
        },
        {
          title: '名稱',
          dataIndex: 'Name',
          key: 'Name',
          width: 300,
          align: "left",

        },
        {
          title: '時間',
          dataIndex: 'Time',
          key: 'Time',
          align: "center",
        },
        {
          title: '類別',
          dataIndex: 'tags',
          key: 'tags',
          align: "center",
          render: tags => (
            <>          
              {tags.map(tag => {
                let color = tag === "坐姿" ? '#6395F9' : '#62DAAB';
              
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}      
            </>      
          ),
        },
        {
          title: ' ',
          key: 'action',
          align: "center",
          //record 可以抓這欄的資料 ex {record.Account}
          render: (text, record) => (
            <Space size="middle">
              <Button onClick={() => this.showModalEdit(record.Account)}>詳細資訊</Button>
              <Button danger onClick={() => this.showModalDelete(record.Account)}>刪除</Button>
              <Modal
                title="詳細資訊"
                visible={visibleEdit}
                onCancel={this.handleCancelEdit}
                width={1000}
                footer={[]}
              >
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} ref={this.formRef} >
                  <Row>
                    <Col flex={5}>
                      <img src={test1} width={450} style={{ marginTop: 50 }}></img>
                    </Col>
                    <Col flex={5}>
                      <img src={notebooknew} width={500}></img>
                    </Col>
                  </Row>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }} style={{ marginTop: "20px" }}>
                    <Button type="primary" key="back" onClick={this.handleCancelEdit}>
                      返回
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <Modal
                title="刪除"
                visible={visibleDelete}
                onOk={() => this.handleOkDelete(record.Account)}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancelDelete}
                footer={[
                  <Button key="back" onClick={this.handleCancelDelete}>
                    返回
                  </Button>,
                  <Button key="submit" type="primary" loading={confirmLoading} onClick={() => this.handleOkDelete(record.Account)}>
                    確認
                  </Button>,
                ]}
              >
                <p>{ModalTextDelete}</p>
              </Modal>
            </Space>
          ),
        },
      ];
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
              <Card title="折線圖" bordered={false} style={{ width: 500 }}>
                <Line {...LineConfig} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="圓餅圖" bordered={false} style={{ width: 500 }}>
                <Pie {...PieConfig} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="長條圖" bordered={false} style={{ width: 500 }}>
                <Bar  {...BarConfig} />
              </Card>
            </Col>
          </Row>
          <div>
            <Table columns={columns} dataSource={dataSource} style={{ margin: "0px 0px 0px 0px" }} />
          </div>
        </Layout>

      )
    }
  }
)
