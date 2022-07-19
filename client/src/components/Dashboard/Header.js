import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';

const Header=() => {
  return (

    <div className='header_main'>

      <Link className='header_main_text program_btn' to='/admin'><SurroundSoundIcon fontSize='22' sx={{ marginTop: '8px' }} /> Program</Link>
      <a className='header_main_text'><AccessTimeIcon fontSize='22' sx={{ marginTop: '8px' }} /> Remaining Time: <span className='header_secondary_text'>24:00</span></a>

      <a className='header_main_text logout_btn' href='/login'><LogoutIcon fontSize='22' sx={{ marginTop: '8px' }} /> Logout </a>

    </div>

  )
}

export default Header