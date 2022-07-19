import React, { useState } from 'react'
import { Button } from 'antd';
import { Col, Divider, Row } from 'antd';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import SettingsIcon from '@mui/icons-material/Settings';

const MainBox=() => {
  const [ value, setValue ]=useState( 1 )

  const changeCourseValue=( condition ) => {
    if ( condition==='up' ) {
      if ( value!==66 ) setValue( value+1 )
    } else {
      if ( value!==1 ) setValue( value-1 )
    }

  }

  return (
    <div className='main_box'>


      <div className='amount_box'>
        <div className='course_no'>{value}</div>
        <div className='amount'>1,000 Amount</div>
      </div>


      <Row justify="space-between" style={{ marginTop: "40px", textAlign: 'center' }}>
        <Col span={8}> <Button type="primary" className='box_btn win_btn'>Win <ThumbUpIcon sx={{ fontSize: '12px', marginTop: '6px', marginLeft: '4px' }} /></Button> </Col>
        <Col span={8}> <Button type="primary" className='box_btn tie_btn'>Tie<ThumbsUpDownIcon sx={{ fontSize: '12px', marginTop: '6px', marginLeft: '4px' }} /></Button> </Col>
        <Col span={8}> <Button type="primary" className='box_btn loose_btn'>Loose<ThumbDownIcon sx={{ fontSize: '12px', marginTop: '6px', marginLeft: '4px' }} /></Button> </Col>
      </Row>



      <Row justify="space-between" style={{ marginTop: "30px", textAlign: 'center' }}>
        <Col span={6}> <Button className='box_btn2 '>New Game</Button> </Col>
        <Col span={6}> <Button className='box_btn2 '>Back</Button> </Col>
        <Col span={6}> <Button className='box_btn2 '>Reset</Button> </Col>
        <Col span={6}> <Button className='box_btn2 '><SettingsIcon sx={{ marginTop: '2px', fontSize: '15px', fontWeight: 'bold' }} /></Button> </Col>
      </Row>



      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col span={6} style={{ textAlign: 'right', marginTop: '10px', marginRight: 20 }}> <KeyboardArrowUpIcon className='arrows' onClick={() => { changeCourseValue( 'up' ) }} /> </Col>
        <Col span={6}> <div className='course_inputBox'>#<span>{value}</span></div> </Col>
        <Col span={6} style={{ marginTop: '10px', marginLeft: 20 }}> <KeyboardArrowDownIcon className='arrows' onClick={() => { changeCourseValue( 'down' ) }} /> </Col>
      </Row>


      <Row justify="space-between" style={{ marginTop: "30px", textAlign: 'center' }}>
        <Col span={8}>
          <div className='courses '><span></span></div>
          <div className='bet_amount '>0</div>
        </Col>
        <Col span={8}>
          <div className='courses course_red'> #<span>1</span></div>
          <div className='bet_amount bet_amount_red'>10000</div>
        </Col>

        <Col span={8}>
          <div className='courses course_blue'> #<span>1</span></div>
          <div className='bet_amount bet_amount_blue'>20000</div>
        </Col>
      </Row>








    </div>
  )
}

export default MainBox