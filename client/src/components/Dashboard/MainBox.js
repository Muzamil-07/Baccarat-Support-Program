import React, { useState } from 'react'
import { Button , Modal , Select} from 'antd';
import { Col, Row } from 'antd';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import SettingsIcon from '@mui/icons-material/Settings';

const MainBox=() => {

  const { Option } = Select;


  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleAmountChange = (value) => {
    console.log(`selected ${value}`);
  };
  

  const handleLevelChange = (value) => {
    console.log(`selected ${value}`);
  };
  



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
        <Col span={6}> <Button className='box_btn2 ' onClick={showModal}><SettingsIcon sx={{ marginTop: '2px', fontSize: '15px', fontWeight: 'bold' }} /></Button> </Col>
      </Row>


      <Modal className='setting_modal' closable={false} width={350} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{textAlign:'center', padding:'1rem'}}>Setting Amount</div>
        <div style={{textAlign:'center'}}>
        <Select
      defaultValue=""
      style={{
        width: 180,
        border:'2px solid blue',
        borderRadius:'4px',
      }}
      onChange={handleAmountChange}
    >
      <Option value="1000">1000</Option>
      <Option value="2000">2000</Option>
      <Option value="3000">3000</Option>
      <Option value="3000-9">3000 - 9</Option>
    </Select>
        </div>
        <div style={{textAlign:'center' , padding:'1rem'}}>Setting Level</div>
        <div style={{textAlign:'center'}}>
        <Select
      defaultValue=""
      style={{
        width: 180,
        border:'2px solid blue',
        borderRadius:'4px',
      }}
      onChange={handleLevelChange}
    >
      <Option value="step8">Step 8</Option>
      <Option value="step9">Step 9</Option>
      <Option value="step10">Step 10</Option>
      </Select>
        </div>

      </Modal>



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