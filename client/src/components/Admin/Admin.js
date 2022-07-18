import React from 'react'
import {Row , Col} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import './Admin.css'
import UsersTable from './UsersTable';

export default function Admin() {
  return (
    <>

    <div className='admin_nav'>
        <Row style={{paddingTop:'1rem'}}>
            <Col span={20}><div>Baccarat</div></Col>
            <Col span={2}><div>Profile</div></Col>
            <Col span={2}><div>Logout</div></Col>
        </Row>
    </div>
    <div style={{marginTop:'5rem' , marginLeft:'1rem'}}>

    <Breadcrumb>
    <Breadcrumb.Item  >
      <HomeOutlined /> Admin
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <UserOutlined /> Users
    </Breadcrumb.Item>
  </Breadcrumb>
  </div>
  <div style={{padding:'3rem'}}>
    <UsersTable/>
  </div>

    </>
  )
}
