import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography , Tooltip, message } from 'antd';
import { useGetAllUsersQuery, useUpdateDurationMutation, useUpdatePasswordMutation } from '../../services/nodeApi';
import Countdown from "react-countdown";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import Highlighter from 'react-highlight-words';


export default function UsersTable() {

  const editRef = useRef(null);
  const refForm = useRef(null);

  const [ updatePassword ]=useUpdatePasswordMutation();
  const [ updateDuration] = useUpdateDurationMutation();
  const [ searchText, setSearchText ]=useState( '' );
  const [ searchedColumn, setSearchedColumn ]=useState( '' );
  const searchInput=useRef( null );

  const handleSearch=( selectedKeys, confirm, dataIndex ) => {
    confirm();
    setSearchText( selectedKeys[ 0 ] );
    setSearchedColumn( dataIndex );
  };

  const handleReset=( clearFilters ) => {
    clearFilters();
    setSearchText( '' );
  };

  const getColumnSearchProps=( dataIndex ) => ( {
    filterDropdown: ( { setSelectedKeys, selectedKeys, confirm, clearFilters } ) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[ 0 ]}
          onChange={( e ) => setSelectedKeys( e.target.value? [ e.target.value ]:[] )}
          onPressEnter={() => handleSearch( selectedKeys, confirm, dataIndex )}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch( selectedKeys, confirm, dataIndex )}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters&&handleReset( clearFilters )}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: ( filtered ) => (
      <SearchOutlined
        style={{
          color: filtered? '#1890ff':undefined,
        }}
      />
    ),
    onFilter: ( value, record ) =>
      record[ dataIndex ].toString().toLowerCase().includes( value.toLowerCase() ),
    onFilterDropdownVisibleChange: ( visible ) => {
      if ( visible ) {
        setTimeout( () => searchInput.current?.select(), 100 );
      }
    },
    render: ( text ) =>
      searchedColumn===dataIndex? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[ searchText ]}
          autoEscape
          textToHighlight={text? text.toString():''}
        />
      ):(
        text
      ),
  } );











  const Completionist=() => {
    return <span>Logged out</span>
  };


  const [ data, setData ]=useState( [] );
  const { data: users, error, isLoading }=useGetAllUsersQuery();



  const originData = [];



  !isLoading&&users.data.data.forEach( ( user, i ) => {



    originData.push( {
      key: user._id,
      no: i+1,
      userid: user.userId,
      password: "***********",
      mobileNumber: user.phone||"940280938",
      timeRemaining: user.endingTime? ( user.endingTime ):0,


    } );

  } );




  useEffect( () => {
    setData( originData )
  }, [] )




const [PASSWORD, setPASSWORD] = useState('');

const handlePassChange = (e)=>{
  setPASSWORD(e.target.value)    

  if(e.target.value.includes('*****')){
    refForm.current.resetFields();

  }
}

const handlePassInputClick = (e) =>{
  if(e.target.value.includes('*****')){
    refForm.current.resetFields();

  }
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input name='PASSWORD' ref={editRef} onClick={handlePassInputClick} value={PASSWORD} key="PASSWORD" autoFocus='autoFocus' onChange={handlePassChange}/>;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      password: '',
      mobileNumber: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const res = await updatePassword({
        id:key,
        password:PASSWORD
      })
      if(res.data.status === 'success'){
        message.success({
          content:"Password updated successfully!",
        })
      }else{
        message.error("Something went wrong! Try again")
      }

      const index=newData.findIndex( ( item ) => key===item.key );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };



  const columns = [
    {
      key: 'no',
        title:'No.',
        dataIndex:'no',
        width:'5%',
        editable:false
    },

    {
      key: 'userid',
      title: 'UserID',
      dataIndex: 'userid',
      width: '20%',
      editable: false,
      ...getColumnSearchProps( 'userid' )
    },
    {
      key: 'password',
      title: 'Password',
      dataIndex: 'password',
      width: '18%',
      editable: true,
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      width: '22%',
      editable: false,
    },
    {
        title:'Time Remaining',
        dataIndex:'timeRemaining',
        width:'15%',
      editable: false,
      render: ( value ) => {
        return (
          <Countdown date={value}>
            <Completionist />
          </Countdown> )

      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <>
            <Tooltip title="Edit user's password" placement='left'>
          <Typography.Link disabled={editingKey !== ''}  onClick={() => {
            edit(record)
            }}>
            Edit
          </Typography.Link>
          </Tooltip>
          <Tooltip title='Allot extra time to this user' placement='bottom'>
          <Popconfirm placement="top" title='Allot 24 Hours to this user?' onConfirm={()=>confirm(record)} okText="Yes" cancelText="No">
          <Typography.Link style={{paddingLeft:'2rem'}}>Allot Time</Typography.Link>
          </Popconfirm>
          </Tooltip>
            </>
        );
      },
    },
  ];

  const confirm = async(record) => {    
    const res = await updateDuration({
      id: record.key,
      })
    if(res.data.status.includes("successfully")){
      message.success("24 Hours added to this user successfully!")
    }else{
      message.error("Something went wrong! Try again")
    }
}

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'timeremaining' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),

    };

  } );

  const onFinish=( values ) => {
    console.log( values )
  }


  return (
    <>
      {!isLoading&&originData.length>0&&
        <div>

          <Form form={form} ref={refForm} onFinish={onFinish} component={false}>
      <Table
      style={{marginTop:'1rem'}}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
              dataSource={originData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
        </div>
      }
    </>
  )
}
