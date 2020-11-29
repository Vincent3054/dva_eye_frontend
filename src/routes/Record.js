import React, { Component } from "react";
import Layout from '../layouts/Recordlayout';
import { connect } from 'dva';
import { Form, Input, Select, Table, Space, Modal, Button, Col, Row,Tag } from 'antd';
import { values } from "lodash";
import warning from "../Assets/warning.png";
import test1 from "../Assets/test1.png"
import notebooknew from "../Assets/notebooknew.png"

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
            <img height={50} src={img} style={{ paddingLeft: "100px" }} />
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
                      <img src={test1} width={450} style={{marginTop:50}}></img>
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
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          img: '警示圖',
          Name: '眼睛位置低於電腦畫面',
          Tag: '坐姿',
          Time: '2020/11/29 下午02:25:15',
          img: warning,
          tags: ['nice', 'developer'],
        },
        {
          key: '3',
          img: '警示圖',
          Name: '環境光線太過昏暗',
          Tag: '環境',
          Time: '2020/11/29 下午02:25:15',
          img: warning,
          tags: ['nice', 'developer'],
        },
      ];

      return (
        <Layout>
          <div>
            <Table columns={columns} dataSource={dataSource} style={{ margin: "0px 0px 0px 0px" }} />
          </div>
        </Layout>

      )
    }
  }
)
