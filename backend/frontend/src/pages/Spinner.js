import React from 'react'
import {Spin} from 'antd'
const Spinner = () => {
  return (
    <div className="spinner">
     <span>Khan's</span> <Spin size="large" /> <span>cars</span>
    </div>
  )
}

export default Spinner
