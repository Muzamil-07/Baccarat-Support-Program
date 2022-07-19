import React from 'react'
import './Signup.css'
import { Col, Row } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
export default function Signup() {


  const onFinish=( values ) => {
    console.log( 'Success:', values );
  };

  const onFinishFailed=( errorInfo ) => {
    console.log( 'Failed:', errorInfo );
  };
  return (
    <div className='main'>

      <Row>
        <Col className="gutter-row" span={12}>
          <div style={{ backgroundColor: 'black', height: "100vh" }}>
            <img className='signup_img' src={require( './../../signup.png' )} alt="svg" />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div className='signup_form'>
            <p style={{ textAlign: 'center', color: 'rgb(228 179 3)', fontSize: '3rem', marginBottom: 0 }}>
              A.I Database
            </p>
            <p style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: 15, fontWeight: 'bold' }}>Signup</p>



            <Form
              name="basic"

              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="userid"
                rules={[
                  {
                    required: true,
                    message: 'Please input User ID!',

                  },
                ]}
              >
                <Input placeholder='Create User ID' />
              </Form.Item>

              <Form.Item

                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input password!',
                  },
                ]}
              >
                <Input.Password placeholder='Create Password' />
              </Form.Item>

              <Form.Item
                name="phoneNo"
                rules={[
                  {
                    required: true,
                    message: 'Please input Mobile Number!',
                  },
                ]}
              >
                <Input placeholder='Create Mobile Number' />



              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Link to='/dashboard'>
                  <Button htmlType="submit" style={{ paddingLeft: '4rem', paddingRight: '4rem', color: 'white', backgroundColor: 'rgb(228 179 3)' }}>
                    Signup
                  </Button>
                </Link>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Link to='/login' className='login_link'>Already have an account? Login</Link>
            </div>

          </div>
        </Col>

      </Row>

    </div>
  )
}