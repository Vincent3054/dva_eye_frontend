import React, { Component } from "react";
import { connect } from 'dva';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const mapStateToProps = state => {
  return {
    classlist: state.class.classliset !== null ? state.class.classliset : [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GET_class(callback, loading) {
      dispatch({ type: 'class/GET_class', callback, loading });
    },
  };
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(
  class ClassList extends Component {
    componentDidMount = () => {
      const { GET_class } = this.props;
      GET_class(null, true);
    }

    render() {

      const NormalLoginForm = () => {

        const onFinish = (values) => {
          console.log('Received values of form: ', values);
        };

        return (
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        );
      };
      return (

        <div style={{ width: "50%" }}>
          <NormalLoginForm />
        </div>
      )
    }
  }
)
