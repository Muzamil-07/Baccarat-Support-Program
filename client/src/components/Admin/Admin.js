import React from 'react'
import {Row , Col} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import './Admin.css'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import UsersTable from './UsersTable';

export default function Admin() {
  const navigate = useNavigate();
  
  const handleLogout=() => {
    Cookies.remove( 'jwt' );

  }

const handleClick = ()=>{

  setTimeout( () => {
    handleLogout();
    navigate( '/login' );
  
  }, 1000 )
}
return (
    <>

    <div className='admin_nav'>
    <span>Baccarat</span>
    <span> <a><PersonIcon fontSize='20px' sx={{marginRight:'5px'}}/>Profile</a> <a onClick={handleClick} style={{paddingLeft:'2rem'}}><LogoutIcon fontSize='20px' sx={{marginRight:'5px'}}/>Logout</a> </span>
    </div>
    <div style={{marginTop:'5rem' , marginLeft:'1rem' , marginBottom:'-1.5rem'}}>

    <Breadcrumb>
    <Breadcrumb.Item  >
      <HomeOutlined /> Admin
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <UserOutlined /> Users
    </Breadcrumb.Item>
  </Breadcrumb>
  </div>

  <div style={{padding:'2rem'}}>
    <UsersTable/>
  </div>

    </>
  )
}
