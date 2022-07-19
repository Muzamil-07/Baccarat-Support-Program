import React from 'react'
import { Col, Row } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { message } from 'antd';
import './Login.css'
import { useLoginMutation } from '../../services/nodeApi';
import Cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function Login() {


  const [ login ]=useLoginMutation();

  const navigate=useNavigate();

  const onFinish=async ( values ) => {
    console.log( 'Success:', values );

    const res=await login( values );



    if ( res.data.status==='success' ) {
      message.success( 'Logged in Successfully!' );
      Cookie.set( 'jwt', res.data.token );
      setTimeout( () => {
        navigate( "/dashboard" );
      }, 2000 )

    }
    else {
      message.success( 'Incorrect email or password!' );
    }

  };

  const onFinishFailed=( errorInfo ) => {
    message.error( 'Failed to login, Please contact your provider!' );
  };







  return (
    <>
      <Row>
        <Col className="gutter-row" span={12}>
          <div style={{ backgroundColor: 'black', height: "100vh" }}>
            <img className='login_img' src={require( './../../login.png' )} alt="svg" />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div className='login_form'>
            <p style={{ textAlign: 'center', color: 'rgb(228 179 3)', fontSize: '3rem', marginBottom: 0 }}>
              A.I Database
            </p>
            <p style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: 15, fontWeight: 'bold' }}>Login</p>



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
                name="userId"
                rules={[
                  {
                    required: true,
                    message: 'Please input your User ID!',

                  },
                ]}
              >
                <Input placeholder='User ID' />
              </Form.Item>

              <Form.Item

                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder='Password' />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
               

                  <Button htmlType="submit" style={{ paddingLeft: '4rem', paddingRight: '4rem', color: 'white', backgroundColor: 'rgb(228 179 3)' }}>
                    Login
                </Button>


              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Link to='/' className='signup_link'>Create an account? Sign up</Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}
