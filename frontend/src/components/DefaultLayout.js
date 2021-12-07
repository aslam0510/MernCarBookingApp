import React from 'react';
import { Menu, Dropdown, Button} from 'antd';
import { DownOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const menu = (
    <Menu>
      <Menu.Item>
        <Link  to="/" >Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link  to="/userbooking">My Bookings</Link>
      </Menu.Item>
      <Menu.Item>
        <Link  to="/admin" onClick={(e)=>{e.preventDefault()
        }}>Admin (only for admins)</Link>
      </Menu.Item>
      <Menu.Item onClick={()=>{localStorage.removeItem('user')}}>
        <Link to="/login" style={{color:'darkblue'}}>Logout</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <div className="d-flex justify-content-around">
          <h1><Link to='/' style={{color:'orangered'}}>Khan's Car</Link></h1>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button className="btn1 mt-1 d-flex justify-content-center align-items-center" style={{color:'orangered'}}>
              {user.userName} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{children}</div>
      <div className="footer text-center bs1 p-3 w-100">
        <p style={{color: 'orangered'}}>Developed by ASLAM KHAN</p>
      </div>
    </div>
  );
};

export default DefaultLayout;
