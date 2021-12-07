import React from 'react'
import {Row, Col, Form, Input} from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from './../redux/actions/userAction';


const Login = () => {
  const dispatch = useDispatch();

  const onFinish = (values) =>{
    dispatch(userLogin(values))
  }
  return (
    <div className="login">
      <Row  className="d-flex login-box justify-content-center align-items-center" >
        <Col lg={5} sm={24} xs={20}>
          <Form layout="vertical" className="login-form" onFinish={onFinish}>
            <h1>Login</h1>
            <hr/>
            <Form.Item name="userName" label="UserName" rules={[{required:true}]}>
              <Input className="p-2"/>
            </Form.Item>
            <Form.Item name="password"  label="Password" rules={[{required:true}]}>
              <Input type="password" className="p-2"/>
            </Form.Item>
            <button className="btn1 w-50 mt-1">Login</button><hr/>
            <span className="text-white span-tag">New User? </span>
          <NavLink to="/register" className="mt-2 ml-1 ">Register Here</NavLink>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
