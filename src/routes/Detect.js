import React, { Component } from "react";
import Layouts from '../layouts/layout';
import { connect } from 'dva';
import { Form, Input, Select, Table, Space, Modal, Button, DatePicker, Card, Col, Row, Radio, Typography, Tag, Statistic } from 'antd';
import { values } from "lodash";
import { CaretRightOutlined } from '@ant-design/icons';

import warning from "../Assets/warning.png";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const { Title, Text } = Typography;
const { Search, TextArea } = Input;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

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
  class Detect extends Component {
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
            <img height={50} src={img} />
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
          dataIndex: 'Tag',
          key: 'Tag',
          align: "center",
          render: tag => (
            <Tag color='blue' key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ),

        },
        {
          title: ' ',
          key: 'action',
          align: "center",
          //record 可以抓這欄的資料 ex {record.Account}
          render: (text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => this.showModalEdit(record.Account)}>項情</Button>
              <Button type="primary" onClick={() => this.showModalDelete(record.Account)}>刪除</Button>
              <Modal
                title="編輯"
                visible={visibleEdit}
                onCancel={this.handleCancelEdit}
                width={1000}
                footer={[]}
              >
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} ref={this.formRef} >
                  <Form.Item
                    name={['Name']}
                    label="名子"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['Email']}
                    label="信箱"
                    rules={[
                      {
                        type: 'email',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['Sex']}
                    label="性別"
                  >
                    <Select
                      placeholder="請選擇..."
                      allowClear
                    >
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={['BirthDate']}
                    label="生日"
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 16 }}>
                    <Button key="back" onClick={this.handleCancelEdit}>
                      返回
                    </Button>
                    <Button type="primary" htmlType="submit">
                      修改
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
          Name: '坐姿問題1',
          Tag: '坐姿',
          Time: '下午02:25:56',
          img: warning,
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          img: '警示圖',
          Name: '環境問題1',
          Tag: '環境',
          Time: '下午02:25:15',
          img: warning,
          tags: ['nice', 'developer'],
        },
        {
          key: '3',
          img: '警示圖',
          Name: '環境問題1',
          Tag: '環境',
          Time: '下午02:25:15',
          img: warning,
          tags: ['nice', 'developer'],
        },
        {
          key: '4',
          img: '警示圖',
          Name: '環境問題1',
          Tag: '環境',
          Time: '下午02:25:15',
          img: warning,
          tags: ['nice', 'developer'],
        },
      ];
      return (
        <Layouts>
          <div style={{ marginLeft: "15%", marginRight: "15%" }}>
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8} style={{ padding: "0px 0px 0px 8px"}}>
                  <Card bordered={false} style={{ textAlign: "center" , height:100}}>
                    <Title level={3}>警告次數：0次</Title>
                  </Card>
                </Col>
                <Col span={8} style={{ padding: "0px 0px 0px 0px" }}>
                  <Card bordered={false} style={{ textAlign: "center" , height:100 }}>
                    <Button type="primary" icon={<CaretRightOutlined />} size="large">
                      Download
                    </Button>
                  </Card>
                </Col>
                <Col span={8} style={{ padding: "0px 8px 0px 0px" }}>
                  <Card bordered={false} style={{ textAlign: "center" , height:100 }}>
                    <Countdown value={deadline} format="D 天 H 時 m 分 s 秒" />
                  </Card>
                </Col>
              </Row>
            </div>
            <br></br>
            <Row >
              <Col span={24} style={{ background: "#fff", padding: "0px 24px 0px 24px" }}>
                <Col flex="auto" style={{ textAlign: "right", margin: "20pt 0pt 20pt 0pt" }}>
                  <Radio.Group
                    value="all"
                    onChange={this.handleSizeChange}
                    style={{ marginRight: "3%" }}
                  >
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="default">坐姿</Radio.Button>
                    <Radio.Button value="small">環境</Radio.Button>
                  </Radio.Group>
                  <Search placeholder="請輸入" style={{ width: 200 }} />
                </Col>
                <Table columns={columns} dataSource={dataSource} style={{ margin: "0px 30px 0px 30px" }} />
              </Col>
            </Row>
          </div>

        </Layouts>

      )
    }
  }
)
