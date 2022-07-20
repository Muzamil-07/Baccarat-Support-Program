import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import { useSelector } from "react-redux";



const Header=() => {

  
  

  const { userData } = useSelector((state) => state.user);

  console.log('----------------', userData)

  const navigate=useNavigate();

  const handleLogout=() => {
    Cookies.remove( 'jwt' );

  }

  const Completionist=() => {

    setTimeout( () => {
      handleLogout();
      navigate( '/login' );

    }, 1000 )
    return <span>
    로그아웃 중입니다  .....!</span>
  };

  return (


    <div className='header_main'>
      <span style={{fontWeight:'bold'}}>다시 오신 것을 환영합니다 , {userData.userId}</span>
      <span>
      <Link className='header_main_text program_btn' to='/admin'><SurroundSoundIcon fontSize='22' sx={{ marginTop: '8px' }} /> 프로그램</Link>
        <a className='header_main_text'><AccessTimeIcon fontSize='15px' sx={{ marginTop: '8px' }} /> 남은 시간 : <span className='header_secondary_text'>
        <Countdown date={new Date(userData.endingTime)}>
          <Completionist />
        </Countdown>
      </span></a>

      <Link className='header_main_text logout_btn' onClick={handleLogout} to='/login'><LogoutIcon fontSize='15px' sx={{ marginTop: '8px' }} /> 로그 아웃 </Link>
</span> 
    </div>

  )
}

export default Header