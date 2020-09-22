import React,{Component} from "react";
import {connect} from 'dva';
import {Table} from 'antd';
const mapStateToProps = state => {
  return {
    classlist: state.class.classliset !== null ? state.class.classliset : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GET_class(callback, loading) {
      dispatch({ type:'class/GET_class', callback, loading });
    },
  };
};

const columns = [
  {
    title: '帳號2',
    dataIndex: 'Account',
    key: 'Account',
  },
  {
    title: '信箱2',
    dataIndex: 'Email',
    key: 'Email',
  },
  {
    title: '名子2',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: '性別2',
    dataIndex: 'Sex',
    key: 'Sex',
  },
  {
    title: '生日2',
    dataIndex: 'BirthDate',
    key: 'BirthDate',
  }
];

export default connect(
  mapStateToProps,mapDispatchToProps
)(
  class ClassList extends Component{
    componentDidMount=()=>{
      const{GET_class}=this.props;
      GET_class(null,true);
    }
    render(){
      return(
        <div>
        <Table columns={columns} dataSource={this.props.classlist} />
        </div>
      )
    }
  }
)
