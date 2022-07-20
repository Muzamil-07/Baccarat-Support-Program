import React from 'react'
import { Col, Row } from 'antd';
import { Button, Form, Input , notification} from 'antd';
import { Link } from "react-router-dom";
import { message } from 'antd';
import './Login.css'
import { useLoginMutation } from '../../services/nodeApi';
import Cookie from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { setuserData } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch=useDispatch();

  const [ login ]=useLoginMutation();

  const navigate=useNavigate();

  

  const onFinish=async ( values ) => {

    try{
    const res=await login( values );
    if ( res.data?.status==='success' ) {
      if ( res.data.data.user.role==='admin' ) {
        message.success( 'Logged in Successfully!' );
        Cookie.set( 'jwt', res.data.token );
        setTimeout( () => {
          navigate( "/admin" );
        }, 2000 )

      }

      else if ( res.data.data.user.role==='user' ) {
        message.success( 'Logged in Successfully!' );
        dispatch( setuserData( res.data.data.user ) );
        Cookie.set( 'jwt', res.data.token );


        setTimeout( () => {
          navigate( "/dashboard" );
        }, 2000 )
      }
    }
    else if(res.error.data.message.includes('Incorrect email or password')){
      message.error(res.error.data.message)
    }
    else if(res.error.data.message.includes('You are out of time')){
      console.log(res)
      notification.warning({message:'Out of time!',description:`${res.error.data.message}`,duration:0})
    }
  }catch(err){
    // message.error(err.response.data.message)
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
