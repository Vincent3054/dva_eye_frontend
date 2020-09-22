import React,{Component} from "react";
import {Link} from 'dva/router';
import {connect} from 'dva';
import { Table,Space} from 'antd';

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
    Delete_members(callback, loading) {
      dispatch({ type: 'member/Delete_members', callback, loading });
    },
  };
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
    title: 'Action',
    key: 'action',
    //record 可以抓這欄的資料 ex {record.Account}
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
//GET_members 和下面是相呼應的
//dispatch 是方法 用來發送物件
//type 對應到 effects 的方法
//*都在prpos 呼叫方法

export default connect(
  mapStateToProps,mapDispatchToProps
)(
  class Index extends Component{
    componentDidMount=()=>{
      const{GET_members}=this.props;
      GET_members(null,true); //開關loading畫面
    }
//antd裡面table組件 放東西進去
//table 裡面只接受陣列物件
    render(){
      console.log(this.props.members, 63);

      // const {dataSource}=this.props.members;
      // console.log(dataSource,132)
      return(
        <div>
          <Table  columns={columns} dataSource={this.props.members} />
        </div>
      )
    }
  }
)
