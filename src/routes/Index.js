import React, { Component } from "react";
import Layout from '../layouts/layout';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Space, Modal, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

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
  };
};


//GET_members 和下面是相呼應的
//dispatch 是方法 用來發送物件
//type 對應到 effects 的方法
//*都在prpos 呼叫方法


export default connect(
  mapStateToProps, mapDispatchToProps
)(
  class Index extends Component {
    state = {
      ModalText: '確認要刪除資料嗎?',
      visible: false,
      confirmLoading: false,
    };

    componentDidMount = () => {
      const { GET_members } = this.props;
      GET_members(null, true); //開關loading畫面
    }
    showModal = () => {
      this.setState({
        ModalText: '確認要刪除資料嗎?',
        visible: true,
      });
    };
    handleCancel = () => {
      this.setState({
        visible: false,
      });
    };
    handleOk = (Account) => {
      const { Delete_members } = this.props;
      this.setState({
        ModalText: '正在刪除會員資料',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
        Delete_members(Account, null, true,);
      }, 1000);
    };
    //antd裡面table組件 放東西進去
    //table 裡面只接受陣列物件
    render() {
      const { visible, confirmLoading, ModalText } = this.state;
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
          title: 'Action',
          key: 'action',
          //record 可以抓這欄的資料 ex {record.Account}
          render: (text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={this.showModal}>修改</Button>
              <Button type="primary" onClick={this.showModal}>刪除</Button>
              <Modal
                title="刪除"
                visible={visible}
                onOk={() => this.handleOk(record.Account)}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
                <p>{ModalText}</p>
              </Modal>
            </Space>
          ),
        },
      ];

      return (
        <Layout>
          <div>
            <Table columns={columns} dataSource={this.props.members} />
          </div>
        </Layout>

      )
    }
  }
)
