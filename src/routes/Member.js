import React, { Component } from "react";
import Layout from '../layouts/layout';
import { connect } from 'dva';
import { Form, Input, Select, Table, Space, Modal, Button, DatePicker ,Typography} from 'antd';
import { values } from "lodash";
const { Title, Text } = Typography;

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
  class Member extends Component {
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
          title: '帳號',
          dataIndex: 'Account',
          key: 'Account',
        },
        {
          title: '信箱',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: '名子',
          dataIndex: 'Name',
          key: 'Name',
        },
        {
          title: '性別',
          dataIndex: 'Sex',
          key: 'Sex',
        },
        {
          title: '生日',
          dataIndex: 'BirthDate',
          key: 'BirthDate',
        },
        {
          title: '功能',
          key: 'action',
          //record 可以抓這欄的資料 ex {record.Account}
          render: (text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => this.showModalEdit(record.Account)}>修改</Button>
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

      return (
        <Layout>
          <div>
            <Title level={1}>會員管理</Title>
            <Table columns={columns} dataSource={this.props.members} />
          </div>
        </Layout>

      )
    }
  }
)
