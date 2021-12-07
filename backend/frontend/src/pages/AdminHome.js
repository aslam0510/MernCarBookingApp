
import DefaultLayout from '../components/DefaultLayout'
import React , {useEffect, useState} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { deleteCarAction, getAllCars } from './../redux/actions/carAction';
import {Row, Col, Popconfirm} from 'antd';
import { Link , useHistory} from 'react-router-dom';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';


const AdminHome = () => {
  const history = useHistory()
  const cars = useSelector(state => state.carsSlice.cars);
  const [totalCars, setTotalCars] = useState([])
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllCars())
  }, [])
  
  useEffect(()=>{
      setTotalCars(cars)
  },[cars])
 
  return (
    <DefaultLayout>
     
     <div style={{textAlign:'left', margin: '20px 30px'}}>
      <button className="btn btn-primary"><Link style={{color:'white'}} to='/addCar'>Add New Car</Link></button>
      </div>
      <Row justify='center' >
        
        {totalCars.map((car,index) =>{
          return(
            <Col xxl={5} xl={6} lg={8}  sm={22} xs={22} md={12} key={index} className="p-2 mx-3 ">
              <div className="car p-3 bs1 mt-3">
                <img src={car.carImg} alt={car.name} className="carImg" />
                <div className="car-content d-flex align-items-center justify-content-between ">
                    <div style={{textAlign:'left'}}>
                      <p>{car.name}</p>
                      <p> Rent per Hour {car.rentPerHour} /-</p>
                    </div>
                    <div>
                      
                      <EditOutlined className="btn1" style={{marginRight:'15px' , color:'blue'}} onClick={()=> history.push(`/editCar/${car._id}`,
                        {car}
                      )} />
                      <Popconfirm title="Are you sure to delete this car ?" onConfirm={()=>{
                        dispatch(deleteCarAction({carId : car._id}))
                      }} okText="Yes" cancelText="No">
                      <DeleteOutlined className="btn1" style={{color:'red'}}/>
                      </Popconfirm>
                      {/* <DeleteOutlined className="btn1" style={{color:'red'}}/> */}
                    </div>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
      
    </DefaultLayout>
  )
}

export default AdminHome

