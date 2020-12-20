import React, { Component } from "react";
import Layouts from '../layouts/layout';
import { connect } from 'dva';
import { Form, Input, Select, Table, Space, Modal, Button, Empty, Card, Col, Row, Radio, Typography, Tag, Statistic,message } from 'antd';
import { CaretRightOutlined, PauseOutlined, RedoOutlined } from '@ant-design/icons';
import warning from "../Assets/warning.png";
import test1 from "../Assets/test1.png";
import notebooknew from "../Assets/notebooknew.png";
import btn from "./btn.css";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 + 1000 * 60; // Moment is also OK
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
  class Detect0 extends Component {
    state = {
      ModalTextDelete: '確認要刪除這筆資料嗎?',
      visibleDelete: false,
      visibleEdit: false,
      confirmLoading: false,
      Account: "",
      loadings: [],
      secondsElapsed: 0,
    };

    componentDidMount = () => {
      const { GET_members } = this.props;
      GET_members(null, true); //開關loading畫面
    }

    showModalDelete = (Account) => {
      this.setState({
        ModalTextDelete: '確認要刪除這筆資料嗎?',
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

    handleCancelEdit = () => {
      this.setState({
        Account: "",
      });
    };

    enterLoading = index => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;

        return {
          loadings: newLoadings,
        };
      });
      setTimeout(() => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = false;

          return {
            loadings: newLoadings,
          };
        });
      }, 60000);
    };

    getHours() {
      return ("0" + Math.round(this.state.secondsElapsed / 3600)).slice(-2);
    }
    getMinutes() {
      return ("0" + Math.round((this.state.secondsElapsed % 3600) / 60)).slice(
        -2
      );
    }
    getSeconds() {
      return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
    }
    startTime() {
      var _this = this;
      this.countdown = setInterval(function () {
        _this.setState({ secondsElapsed: _this.state.secondsElapsed + 1 });
      }, 1000);
    }
    resetTime() {
      this.reset = this.setState({
        secondsElapsed: (this.state.secondsElapsed = 0)
      });
    }
    pauseTime() {
      clearInterval(this.countdown);
    }

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
      const error = () => {
        message.error('未偵測到網路攝影機(Webcam)');
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
          Time: '2020/11/29 下午02:25:22',
          img: warning,
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Tag: '坐姿',
          Time: '2020/11/29 下午02:25:12',
          img: warning,
          tags: ['nice', 'developer'],
        },
        {
          key: '3',
          img: '警示圖',
          Name: '環境光線太過昏暗',
          Tag: '環境',
          Time: '2020/11/29 下午02:25:05',
          img: warning,
          tags: ['nice', 'developer'],
        },
      ];
      const { loadings } = this.state;

      return (
        <Layouts>
          <div style={{ marginLeft: "15%", marginRight: "15%" }}>
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8} style={{ padding: "0px 0px 0px 8px" }}>
                  <Card bordered={false} style={{ textAlign: "center", height: 120, padding: "20px 0px 20px 0px" }}>
                    <Title level={3}>警告次數：0次</Title>
                  </Card>
                </Col>
                <Col span={8} style={{ padding: "0px 0px 0px 0px" }}>
                  <Card bordered={false} style={{ textAlign: "center", height: 120, padding: "20px 0px 20px 0px" }}>
                    <Button
                      type="primary"
                      icon={<CaretRightOutlined />}
                      loading={loadings[1]}
                      onClick={() => this.enterLoading(1)}
                      size="large"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.startTime(),error}
                    >
                      Start
                    </Button>
                    <Button
                      type="primary"
                      icon={<PauseOutlined />}
                      loading={loadings[1]}
                      onClick={() => this.enterLoading(1)}
                      size="large"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.pauseTime()}
                    >
                      Pause
                    </Button>
                    <Button
                      type="primary"
                      icon={<RedoOutlined />}
                      loading={loadings[1]}
                      onClick={() => this.enterLoading(1)}
                      size="large"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.resetTime()}
                    >
                      Reset
                    </Button>
                  </Card>
                </Col>
                <Col span={8} style={{ padding: "0px 8px 0px 0px" }}>
                  <Card bordered={false} style={{ textAlign: "center", height: 120, padding: "20px 0px 20px 0px" }}>
                    <Title level={3}>{this.getHours()}時:{this.getMinutes()}分:{this.getSeconds()}秒</Title>
                  </Card>
                </Col>
              </Row>
            </div>
            <br></br>
            <Row >
              <Col span={24} style={{ background: "#fff", padding: "0px 24px 0px 24px" }}>
                <Col flex="auto" style={{ textAlign: "right", margin: "20pt 20pt 20pt 0pt" }}>
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
                <Empty style={{ margin: "100px 100px" }} />
              </Col>
            </Row>
          </div>
        </Layouts>

      )
    }
  }
)
/*
<Button
                      type="primary"
                      icon={<CaretRightOutlined />}
                      loading={loadings[1]}
                      onClick={() => this.enterLoading(1)}
                      size="large"
                    >
                      123
                    </Button>

*/
