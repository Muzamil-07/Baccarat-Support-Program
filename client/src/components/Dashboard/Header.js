import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const Header=() => {
  const navigate=useNavigate();

  const handleLogout=() => {
    Cookies.remove( 'jwt' );

  }

  const Completionist=() => {

    setTimeout( () => {
      handleLogout();
      navigate( '/login' );

    }, 1000 )
    return <span>Logging out.....!</span>
  };


  return (


    <div className='header_main'>

      <Link className='header_main_text program_btn' to='/admin'><SurroundSoundIcon fontSize='22' sx={{ marginTop: '8px' }} /> Program</Link>
      <a className='header_main_text'><AccessTimeIcon fontSize='15px' sx={{ marginTop: '8px' }} /> Remaining Time: <span className='header_secondary_text'>
        <Countdown date={Date.now()+15000}>
          <Completionist />
        </Countdown>
      </span></a>

      <Link className='header_main_text logout_btn' onClick={handleLogout} to='/login'><LogoutIcon fontSize='15px' sx={{ marginTop: '8px' }} /> Logout </Link>

    </div>

  )
}

export default Header