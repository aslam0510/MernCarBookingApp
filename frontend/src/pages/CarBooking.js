import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carAction';
import { Divider, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment';
import { bookCarAction } from './../redux/actions/bookingAction';
import StripeCheckout from 'react-stripe-checkout'
import { Link} from 'react-router-dom';
const CarBooking = ({ match }) => {
  const { RangePicker } = DatePicker;
  const carId = match.params.carId;
  const allCars = useSelector((state) => state.carsSlice.cars);
  const dispatch = useDispatch();
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [isDriver, setIsDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    if (allCars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(allCars.find((car) => car._id == carId));
    }
  }, [allCars]);

  useEffect(()=>{
    setTotalAmount((totalHours * car.rentPerHour) + (isDriver && (totalHours * 30)))

  },[isDriver, totalHours])
  const selectTimeSlot = (values) => {
    setFrom(moment(values[0]).format('MM DD yyyy HH:mm'));
    setTo(moment(values[1]).format('MM DD yyyy HH:mm'));
    setTotalHours(values[1].diff(values[0], 'hours'));
  };

  const onToken = (token) =>{
    const bookingCarObj = {
      token,
      user : JSON.parse(localStorage.getItem('user'))._id,
      car : car._id,
      totalHours,
      totalAmount,
      driverRequire : isDriver,
      bookedTimeSlots : {
        from,
        to
      }
    }
    dispatch(bookCarAction(bookingCarObj));
  }
  return (
    <DefaultLayout>
      <h5 style={{margin:'20px', textAlign:'left'}}><Link to="/">Go back to Home</Link></h5>
      <div className="row car">
        <div className="col-1"></div>
        <img
          className="col-lg-3 col-sm-12 col-xs-12"
          src={car.carImg}
          alt={car.name}
          widht="100%"
          height="100%"
        />
        <div className="col-1"></div>
        <div
          className="col-lg-5 col-sm-12 col-xs-12"
          style={{ textAlign: 'right' }}
        >
          
          <Divider type="horizontal" dahsed>
            CAR INFO
          </Divider>
          <div>
            <p>{car.name}</p>
            <p>Rent Per Hour {car.rentPerHour}/-</p>
            <p>Feul Type : {car.feulType}</p>
            <p>max-persons: {car.capacity}</p>
          </div>
          <Divider type="horizontal" dahsed>
            SELECT TIME SLOT
          </Divider>
          <RangePicker
            format="MM DD yyyy HH:mm"
            showTime={{ format: 'HH:mm' }}
            onChange={selectTimeSlot}
          /><br/>
          {/* <button className="my-2 btn1" onClick={()=>setShowModal(true)}>See Booked Slots</button> */}
          {from && to && (
          <div className="mt-1">
            <p>
              Total Hours : <strong>{totalHours}</strong>
            </p>
            <p>
              Rent Per Hour : <strong>{car.rentPerHour}</strong>
            </p>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setIsDriver(true);
                } else {
                  setIsDriver(false);
                }
              }}
            >
              {' '}
              Driver Required{' '}
            </Checkbox>
            <h5>
              Total Amount: <strong>{totalAmount}</strong>
            </h5>
            <StripeCheckout shippingAddress token={onToken} amount={totalAmount * 100}stripeKey="pk_test_51K3LIzSHr4zH49FNXM919S4KemtkivrYzGDVTbbkUkpUUrS9gRn3H9csGadNIQJ0BissqNrMEzdmrXYJLHOIWZDw00SjgxpZu8" currency='INR'>
            <button className="btn1">Book Now</button>
            </StripeCheckout>
            
          </div>)}
        </div>
      </div>

      <Modal visible={showModal} closable={false} footer={false} title="Booked Time Slots">
          {car && car.bookedTimeSlots?.length > 0 && (
            <div >
              {car.bookedTimeSlots.map(slot =>(
                <button key={car._id} className="btn1 mt-3">{slot.from} - {slot.to}</button>
              ))}
              <Divider type="horizontal" dahsed></Divider>
              <div className="d-flex justify-content-end  mt-2">
                  <button className="btn1" onClick={()=>setShowModal(false)}>Close</button>
              </div>
            </div>
          )}
      </Modal>
    </DefaultLayout>
  );
};

export default CarBooking;
