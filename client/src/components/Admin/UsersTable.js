import React, { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography , Tooltip } from 'antd';
import { useGetAllUsersQuery, useUpdatePasswordMutation } from '../../services/nodeApi';
import Countdown from "react-countdown";



export default function UsersTable() {

  const [ updatePassword ]=useUpdatePasswordMutation();

  const Completionist=() => {
    return <span>Logged out</span>
  };


  const [ data, setData ]=useState( [] );
  const { data: users, error, isLoading }=useGetAllUsersQuery();

  !isLoading&&console.log( users );
  const { Search } = Input;


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


  console.log( "---->", originData, data );


  useEffect( () => {
    setData( originData )
  }, [] )



const onSearch = (e) => {

  const filteredData = originData.filter(entry =>
    entry.userid.toLowerCase().includes(e.target.value.toLowerCase())
  );
   
  console.log(filteredData)
  if(filteredData.length === 0) setData([])
  else setData(filteredData)
};


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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
      const index=newData.findIndex( ( item ) => key===item.key );


      console.log( newData, index )

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
        title:'No.',
        dataIndex:'no',
        width:'5%',
        editable:false
    },

    {
      title: 'UserID',
      dataIndex: 'userid',
      width: '20%',
      editable: false,
    },
    {
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
        console.log( value )
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          </Tooltip>
          <Tooltip title='Allot extra time to this user' placement='bottom'>
          <Popconfirm placement="top" title='Allot 24 Hours to this user?' onConfirm={confirm} okText="Yes" cancelText="No">
          <Typography.Link style={{paddingLeft:'2rem'}}>Allot Time</Typography.Link>
          </Popconfirm>
          </Tooltip>
            </>
        );
      },
    },
  ];

  const confirm = () => {
    alert('ok')
  };
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
      {!isLoading&&originData.length>1&&
        <div>

          <Search
      placeholder="Search by UserID"
      // onSearch={onSearch}
      onChange={onSearch}
      style={{
        display:'flex',
        alignItems:'flex-end',
        width: 200,
        marginLeft:'auto'
        
      }}
    />
          <Form form={form} onFinish={onFinish} component={false}>
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
