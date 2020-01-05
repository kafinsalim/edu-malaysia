/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { authentication } from "../../utils";

const Container = styled.div`
  max-width: 285px;
  margin: auto;
  padding-top: 10vh;
`;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    const { onLogin } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        onLogin(values.username);
        // document.cookie = `username=${values.username}`;
      }
    });
  };

  render() {
    const { isLogin } = authentication.checkLoggedInUser();
    if (isLogin) {
      return <Redirect to="/" />;
    } else {
      const { getFieldDecorator } = this.props.form;
      return (
        <Container>
          <center>
            <span role="img" aria-label="emoji" style={{ fontSize: 128 }}>
              🏫
            </span>
            <h3>
              <b>Edu Malaysia</b>
            </h3>
            <br />
            {authentication.getUsername()}
          </center>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Mohon isi Username!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Mohon isi Password!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a style={{ float: "right" }}>Lupa password</a>
              <br />
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Container>
      );
    }
  }
}

export default Form.create({ name: "normal_login" })(NormalLoginForm);
