import React, { Component } from "react";
import { connect } from 'dva';
import { DatePicker, Button, Select, Input, Form, Modal, Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FileOutlined
} from '@ant-design/icons';
import imgL001 from '../Assets/1.png';

const mapStateToProps = state => {
  return {
    login: state.member.login !== null ? state.member.login : [],
    Register: state.member.Register !== null ? state.member.Register : [],
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Login_members(payload, callback, loading) {
      dispatch({ type: 'member/Login_members', payload, callback, loading });
    },
    Register_members(payload, callback, loading) {
      dispatch({ type: 'member/Register_members', payload, callback, loading });
    },
  };
};
export default connect(
  mapStateToProps, mapDispatchToProps
)(
  class layout extends Component {
    state = {
      collapsed: false,
      visibleLogin: false,
      visibleRegister: false,
    };

    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };

    showModalLogin = () => {
      this.setState({
        visibleLogin: true,
      });
    };
    handleCancelLogin = () => {
      this.setState({
        visibleLogin: false,
      });
    };

    showModalRegister = () => {
      this.setState({
        visibleRegister: true,
      });
    };
    handleCancelRegister = () => {
      this.setState({
        visibleRegister: false,
      });
    };

    render() {
      const { Header, Content, Footer, Sider } = Layout;
      const { SubMenu } = Menu;
      const { children } = this.props;
      const { visibleLogin, visibleRegister } = this.state;
      const { Option } = Select;

      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 10,
        },
      };

      const tailLayout = {
        wrapperCol: {
          offset: 13,
          span: 13,
        },
      };
      const onFinishLogin = (values) => {
        const { Login_members } = this.props;
        console.log('Success:', values);
        this.setState({
          confirmLoading: true,
        });
        Login_members(values);
        setTimeout(() => {
          this.setState({
            visibleLogin: false,
            confirmLoading: false,
          });
        }, 1000);
      };

      const onFinishFailedLogin = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const onFinishRegister = (values) => {
        const { Register_members } = this.props;
        console.log('Success:', values);
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visibleRegister: false,
            confirmLoading: false,
          });
          Register_members(values);
        }, 1000);
      };

      const onFinishFailedRegister = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" style={{ margin: '15px 15px 15px 30px'}}>
              <img width={150} height={30} src={imgL001} />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<DesktopOutlined />}>
                首頁
              </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />}>
                後台
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                會員管理
              </Menu.Item>
              <Menu.Item key="4" icon={<FileOutlined />}>
                其他
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ textAlign: "right" }}>
                <Menu.Item key="11" onClick={this.showModalLogin}>登入</Menu.Item>
                <Menu.Item key="12" onClick={this.showModalRegister}>註冊</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首頁</Breadcrumb.Item>
                <Breadcrumb.Item>會員管理</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {children}
                <Modal
                  title="登入"
                  visible={visibleLogin}
                  onCancel={this.handleCancelLogin}
                  width={700}
                  footer={[]}
                >
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinishLogin}
                    onFinishFailed={onFinishFailedLogin}
                  >
                    <Form.Item
                      label="帳號"
                      name="Account"
                      rules={[
                        {
                          required: true,
                          message: '請輸入您的帳號!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="密碼"
                      name="Password"
                      rules={[
                        {
                          required: true,
                          message: '請輸入您的密碼!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button key="back" onClick={this.handleCancelLogin}>
                        返回
                      </Button>
                      <Button type="primary" htmlType="submit">
                        登入
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
                <Modal
                  title="註冊"
                  visible={visibleRegister}
                  onCancel={this.handleCancelRegister}
                  width={800}
                  footer={[]}
                >
                  <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                    onFinish={onFinishRegister}
                    onFinishFailed={onFinishFailedRegister}
                  >
                    <Form.Item
                      label="帳號"
                      name="Account"
                      rules={[
                        {
                          required: true,
                          message: '請輸入您的帳號!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="密碼"
                      name="Password"
                      rules={[
                        {
                          required: true,
                          message: '請輸入您的密碼!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name={['Email']}
                      label="信箱"
                      rules={[
                        {
                          required: true,
                          type: 'email',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name={['Name']}
                      label="名子"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={['Sex']}
                      label="性別"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item wrapperCol={{  offset: 16 }}>
                      <Button key="back" onClick={this.handleCancelRegister}>
                        返回
                      </Button>
                      <Button type="primary" htmlType="submit">
                        註冊
                      </Button>
                    </Form.Item>

                  </Form>
                </Modal>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      )
    }
  }
)
