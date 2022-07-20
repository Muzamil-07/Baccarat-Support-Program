import React, { useState } from 'react'
import { Button , Modal , Select} from 'antd';
import { Col, Row } from 'antd';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import SettingsIcon from '@mui/icons-material/Settings';
import { useGetPatternMutation } from '../../services/nodeApi';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setValue } from '../../redux/valueSlice';
import { setIndex } from '../../redux/indexSlice';
import { setArr } from '../../redux/arrSlice';
import { setColors } from '../../redux/colorSlice';


const MainBox=() => {

  const { Option } = Select;
  const dispatch=useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ level, setLevel ]=useState( null )
  const [ amount, setAmount ]=useState( null )

  // const [ arr, setArr ]=useState( [ '', '', '' ] )
  // const [ index, setIndex ]=useState( 0 );
  // const [ value, setValue ]=useState( 1 )
  // const [ colors, setColors ]=useState( [] )



  const { value }=useSelector( ( state ) => state.val );
  const { index }=useSelector( ( state ) => state.ind );
  const { arr }=useSelector( ( state ) => state.arr );
  const { colors }=useSelector( ( state ) => state.col );

  const [ getPattern ]=useGetPatternMutation()


  const randomColors=() => {
    let arr=[ ...colors ];
    for ( let i=index; i<66; i++ ) {
      let rand=Math.floor( Math.random()*10 );
      if ( rand%2===0 ) {
        arr[ i ]='red'
      } else {
        arr[ i ]='blue'
      }
    };
    dispatch( setColors( arr ) );
    console.log( 'array >>>>>>>>>>>>>>>>>>', arr );
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk=async () => {
    setIsModalVisible( false );
    const res=await getPattern( { selAmount: amount, selLevel: level } );
    dispatch( setArr( res.data.data ) );
    randomColors();
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleAmountChange = (value) => {
    console.log( `selected ${value}` );
    setAmount( value );
  };
  

  const handleLevelChange = (value) => {
    console.log( `selected ${value}` );
    setLevel( value );
  };
  
  const handleReset=() => {
    randomColors();
  }







  const changeCourseValue=( condition ) => {
    if ( condition==='up' ) {
      if ( value!==66 ) {
        dispatch( setValue( value+1 ) )
        dispatch( setIndex( index+1 ) )
      } 
    } else {
      if ( value!==1 ) {
        dispatch( setValue( value-1 ) )
        dispatch( setIndex( index-1 ) );
      }
    }

  }



  const handleWin=() => {
    changeCourseValue( 'up' );
    randomColors()
    dispatch( setIndex( 0 ) );
  }

  const handleLose=() => {
    changeCourseValue( 'up' );
    dispatch( setIndex( index+1 ) );
  }

  const handleTie=() => {
    if ( value!==66 ) {
      dispatch( setValue( value+1 ) )
    }
    else {
      if ( value!==1 ) {
        dispatch( setValue( value-1 ) )
      }
    }
  }


  const handleNewGame=() => {
    dispatch( setIndex( 0 ) );
    dispatch( setValue( 1 ) );
    dispatch( setArr( [ '', '', '' ] ) );
  }

  const handleBack=() => {
    // changeCourseValue( 'down' );
    if ( index>0 )
      dispatch( setIndex( index-1 ) );
  }

  return (
    <div className='main_box'>


      <div className='amount_box'>
        <div className={`course_no course_${colors[ index ]}`}>{index+1}</div>
        <div className='amount'>{arr.length>3? arr[ index ].toLocaleString():0} 총액 </div>
      </div>


      <Row justify="space-between" style={{ marginTop: "40px", textAlign: 'center' }}>
        <Col span={8}> <Button type="primary" className='box_btn win_btn' disabled={arr.length<4} onClick={handleWin}>이기다 <ThumbUpIcon sx={{ fontSize: '12px', marginTop: '6px', marginLeft: '4px' }} /></Button> </Col>
        <Col span={8}> <Button type="primary" className='box_btn tie_btn' disabled={arr.length<4} onClick={handleTie}>묶다<ThumbsUpDownIcon sx={{ fontSize: '12px', marginTop: '6px', marginLeft: '4px' }} /></Button> </Col>
        <Col span={8}> <Button type="primary" className='box_btn loose_btn' disabled={arr.length<4} onClick={handleLose}>잃다<ThumbDownIcon sx={{ fontSize: '12px', marginTop: '6px', marginLeft: '4px' }} /></Button> </Col>
      </Row>



      <Row justify="space-between" style={{ marginTop: "30px", textAlign: 'center' }}>
        <Col span={6}> <Button className='box_btn2 ' disabled={arr.length<=3} onClick={handleNewGame}>새로운 게임</Button> </Col>
        <Col span={6}> <Button className='box_btn2 ' onClick={handleBack} disabled={arr.length<=3||index===0}>뒤</Button> </Col>
        <Col span={6}> <Button className='box_btn2 ' disabled={arr.length<=3} onClick={handleReset}>초기화</Button> </Col>
        <Col span={6}> <Button className='box_btn2 ' onClick={showModal}><SettingsIcon sx={{ marginTop: '2px', fontSize: '15px', fontWeight: 'bold' }} /></Button> </Col>
      </Row>


      <Modal className='setting_modal' closable={false} width={350} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{textAlign:'center', padding:'1rem'}}>설정 금액</div>
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
            <Option value="30009">3000-9</Option>
    </Select>
        </div>
        <div style={{textAlign:'center' , padding:'1rem'}}>설정 레벨</div>
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
            <Option value="8" disabled={amount==='30009'}>단계 8</Option>
            <Option value="9">단계 9</Option>
            <Option value="10" disabled={amount==='30009'}>단계 10</Option>
      </Select>
        </div>

      </Modal>



      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col span={6} style={{ textAlign: 'right', marginTop: '10px', marginRight: 20 }}>
          <Button className='arrows' disabled={arr.length<4} onClick={() => { changeCourseValue( 'up' ) }}>
            <KeyboardArrowUpIcon /> </Button></Col>
        <Col span={6}> <div className='course_inputBox'>#<span>{value}</span></div> </Col>
        <Col span={6} style={{ marginTop: '10px', marginLeft: 20 }}>

          <Button onClick={() => { changeCourseValue( 'down' ) }} className='arrows' disabled={arr.length<4}> <KeyboardArrowDownIcon /></Button> </Col>
      </Row>


      <Row justify="space-between" style={{ marginTop: "30px", textAlign: 'center' }}>
        <Col span={8}>
          <div className={`courses course_${index-1<0? '':colors[ index-1 ]}`}><span>{index-1<0? '':`#${index}`}</span></div>
          <div className={`bet_amount bet_amount_${index-1<0? '':colors[ index-1 ]}`}>{index-1<0? '':arr[ index-1 ].toLocaleString()}</div>
        </Col>
        <Col span={8}>
          <div className={`courses course_${colors[ index ]}`}> #<span>{index+1}</span></div>
          <div className={`bet_amount bet_amount_${colors[ index ]}`}>{arr[ index ].toLocaleString()}</div>
        </Col>

        <Col span={8}>
          <div className={`courses course_${colors[ index+1 ]}`}> #<span>{index+2}</span></div>
          <div className={`bet_amount bet_amount_${colors[ index+1 ]}`}>{arr[ index+1 ].toLocaleString()}</div>
        </Col>
      </Row>








    </div>
  )
}

export default MainBox