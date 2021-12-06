import React  from 'react'
import DefaultLayout from './../components/DefaultLayout';
import { Row, Col , Form, Input} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewCarAction } from '../redux/actions/carAction';

const AddCar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) =>{
    console.log(values);
    values.bookedTimeSlots = []
    dispatch(addNewCarAction(values))
    history.push('/')
  }
  return (
    <DefaultLayout>
      <Row justify='center' className="mt-5">
        <Col lg={5} xs={20}>
          <h5><Link to="/admin">Go to Admin Page</Link></h5>
          <Form className="bs1 p-3 mb-5" layout='vertical' onFinish={onFinish}>
          <h3 className="mt-2">Add New Car</h3>
            <Form.Item name="name" label="Car Name" rules={[{required:true}]}>
            <Input />
            </Form.Item>
            <Form.Item name="carImg" label="Image URL" rules={[{required:true}]}>
              <Input />
            </Form.Item>
            <Form.Item name="rentPerHour" label="Rent Per Hour" rules={[{required:true}]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" rules={[{required:true}]}>
              <Input type="number"/>
            </Form.Item>
            <Form.Item name="feulType" label="FeulType" rules={[{required:true}]}>
              <Input />
            </Form.Item>
            <button className="btn1">Add Car</button>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default AddCar
