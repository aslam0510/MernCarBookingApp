import React , {useEffect, useState} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from './../redux/actions/carAction';
import {Row, Col, DatePicker} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Home = () => {
  const { RangePicker } = DatePicker;
  const cars = useSelector(state => state.carsSlice.cars);
  const [totalCars, setTotalCars] = useState([])
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllCars())
  }, [])
  
  useEffect(()=>{
      setTotalCars(cars)
  },[cars])
  const onFilterCars =(values) =>{
    let selectedFrom = moment(values[0], 'MM DD yyy HH:mm');
    let selectedTo = moment(values[1] , 'MM DD yyy HH:mm');
    let availableCars = [];

    for(let car of cars){
      if(car.bookedTimeSlots.length === 0){
        availableCars.push(car)
      }else{
        for(let booking of car.bookedTimeSlots){
          if(selectedFrom.isBetween(booking.from, booking.to) || selectedTo.isBetween(booking.from,booking.to) || moment(booking.from).isBetween(selectedFrom,selectedTo) ||  moment(booking.to).isBetween(selectedFrom,selectedTo)){

          }else{
            availableCars.push(car)
          }
        }
      }
      setTotalCars(availableCars)
    }
  }
  return (
    <DefaultLayout>
      <Row justify='center' className="mt-4" >
        <Col lg={20}>
          <strong>Check the Available Cars</strong><br />
          <RangePicker  showTime={{ format: 'HH:mm' }} format="MM DD yyyy HH:mm" onChange={onFilterCars} className="mx-4 mt-1"/>
        </Col>
      </Row>
      <Row justify='center' >
        {totalCars.map((car,index) =>{
          return(
            <Col xxl={5} xl={6} lg={8}  sm={22} xs={22} md={12} key={index} className="p-2 mx-3 ">
              <div className="car p-3 bs1 mt-3">
                <img src={car.carImg} alt={car.name} className="carImg" />
                <div className="car-content d-flex align-items-center justify-content-between ">
                    <div style={{textAlign:'left'}}>
                      <p>{car.name}</p>
                      <p>Rent per Hour {car.rentPerHour} /-</p>
                    </div>
                    <div>
                      <Link to={`/booking/${car._id}`} ><button className="btn1">Book Now</button></Link>
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

export default Home
