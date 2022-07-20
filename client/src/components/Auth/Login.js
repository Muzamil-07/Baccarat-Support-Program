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
        message.success( '로그인 성공' );
        Cookie.set( 'jwt', res.data.token );
        setTimeout( () => {
          navigate( "/admin" );
        }, 2000 )

      }

      else if ( res.data.data.user.role==='user' ) {
        message.success( '로그인 성공' );
        dispatch( setuserData( res.data.data.user ) );
        Cookie.set( 'jwt', res.data.token );


        setTimeout( () => {
          navigate( "/dashboard" );
        }, 2000 )
      }
    }
    else if(res.error.data.message.includes('잘못된 이메일 또는 비밀번호')){
      message.error(res.error.data.message)
    }
    else if(res.error.data.message.includes('당신은 시간이 없습니다')){
      console.log(res)
      notification.warning({message:'시간 중!',description:`${res.error.data.message}`,duration:0})
    }
  }catch(err){
    // message.error(err.response.data.message)
  }


  };


  const onFinishFailed=( errorInfo ) => {
    message.error( '로그인에 실패했습니다. 제공업체에 문의하세요' );
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
            AI 데이터베이스
            </p>
            <p style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: 15, fontWeight: 'bold' }}>로그인</p>



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
                    message: '아이디를 입력해주세요',

                  },
                ]}
              >
                <Input placeholder='사용자 아이디' />
              </Form.Item>

              <Form.Item

                name="password"
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                  },
                ]}
              >
                <Input.Password placeholder='비밀번호' />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
               

                  <Button htmlType="submit" style={{ paddingLeft: '4rem', paddingRight: '4rem', color: 'white', backgroundColor: 'rgb(228 179 3)' }}>
                  로그인
                </Button>


              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Link to='/' className='signup_link'>계정을 만드시겠습니까? 가입하기</Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}
