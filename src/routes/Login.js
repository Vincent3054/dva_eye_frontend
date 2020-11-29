import React, { Component } from "react";
import { connect } from 'dva';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Modal, Avatar, Row, Col, Typography } from "antd";
import img from "../Assets/3.png";
import login from "../Assets/login2.jpg";
const { Title } = Typography;


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

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

//GET_members 和下面是相呼應的
//dispatch 是方法 用來發送物件
//type 對應到 effects 的方法
//*都在prpos 呼叫方法


export default connect(
  mapStateToProps, mapDispatchToProps
)(
  class Login extends Component {
    state = {
      user: {
        username: "User003",
        password: "12345",
        remember: false,
      },
      teach: {
        username: "teacher000",
        password: "123456",
        remember: false,
      },
      user_nm: "",
      user_pw: "",
      visible: false,
      input_clear: false,
    };
    Warning = () => {
      Modal.warning({
        title: "帳號密碼錯誤，請重新輸入",
      });
      this.setState({
        input_clear: true,
      });
    };

    //antd裡面table組件 放東西進去
    //table 裡面只接受陣列物件
    render() {
      const { user, teach, user_nm, user_pw } = this.state;
      const NormalLoginForm = () => {
        const onFinish = (values) => {
          console.log("Received values of form: ", values);
          if (
            (values.username === user.username &&
              values.password === user.password) || (values.username === teach.username &&
                values.password === teach.password)
          ) {
            if (values.username === user.username) {
              this.props.history.push("/Detect");
            }
            else {
              this.props.history.push("/Teacher");
            }
          } else {
            this.Warning();
          }
        };
        return (
          <Form
            name="normal_login"
            className="login-form"
            size="large"
            initialValues={{
              username: user_nm,
              password: user_pw,
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "請輸入帳號!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="帳號"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "請輸入密碼!",
                },
              ]}
            >
              <Input
                width={300}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密碼"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle >
                <Checkbox  >記住我</Checkbox><span style={{marginLeft:"100px"}}><a>註冊</a> | <a>忘記密碼</a></span>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" className="login_form_btn" style={{ color: "#fff", border: "none" }}>
                登入
            </Button>
            </Form.Item>
          </Form>
        );
      };

      return (
        <div>
          <img width="100%" src={login} style={{ position: "absolute", top: 0, left: 0, border: "7 1px solid rgba(0, 0, 0, 0.1)" }}></img>
          <Row justify="space-around" align="middle"   >
            <Col span={4} style={{ marginTop: 300, backgroundColor: "#fff", padding: "20px 20px 20px 20px", borderRadius: "10px",boxShadow:"0 3px 20px 0 rgba(0,0,0,.1)" }} >
              <img src={img} width={250} style={{margin:"15pt 0px 30pt 10pt",textAlign:"center"}}></img>
              <NormalLoginForm />
            </Col>
          </Row>
        </div>

      )
    }
  }
)
//             <img width={300} src={img} style={{ marginBottom: "20px", position: "absolute", top: 220, left: 805 }}></img>
//              <Title level={3} style={{ textAlign: "center", margin: "10px 0 30px 0" }}>登入</Title>
