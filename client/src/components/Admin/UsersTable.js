import React , {useState}from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography , Tooltip } from 'antd';

export default function UsersTable() {


  const { Search } = Input;


  const originData = [];

for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    no: i.toString(),
    userid: `Edrward ${i}`,
    password: 32,
    mobileNumber: `031433213${i}`,
    timeRemaining: i.toString()
  });
}


const onSearch = (value) => {

  const filteredData = originData.filter(entry =>
    entry.userid.toLowerCase().includes(value.toLowerCase())
  );
   
  console.log(filteredData)
  if(filteredData.length === 0) originData.length = 0
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
  const [data, setData] = useState(originData);
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
      const index = newData.findIndex((item) => key === item.key);

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
        editable:false,
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
  });


  return (
    <>
    <Search
      placeholder="Search by UserID"
      onSearch={onSearch}
      style={{
        display:'flex',
        alignItems:'flex-end',
        width: 200,
        marginLeft:'auto'
        
      }}
    />
     <Form form={form} component={false}>
      <Table
      style={{marginTop:'1rem'}}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  )
}