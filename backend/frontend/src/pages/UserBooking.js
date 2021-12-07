import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getBookingCarAction } from '../redux/actions/bookingAction';
import { Row, Col } from 'antd';
import moment from 'moment';

const UserBooking = () => {
  const bookingCars = useSelector((state) => state.carsSlice.bookingCars);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(getBookingCarAction());
  }, []);
  
  return (
    <DefaultLayout>
      <h3 className="mt-3">My Bookings</h3>
      <Row justify="center">
        <Col lg={20} sm={18}>
          {bookingCars.filter(u => u.user === user._id).map((booking, index) => (
            <Row
              className="bs1 m-4 p-1"
              style={{ textAlign: 'left' }}
              key={index}
            >
              <Col lg={7}>
                <strong>{booking.car.name}</strong>
                <p>
                  Total Hours :<strong> {booking.totalHours}</strong>
                </p>
                <p>
                  Rent Per Hour :<strong>{booking.car.rentPerHour}</strong>{' '}
                </p>
                <p>
                  Total Amount : <strong>{booking.totalAmount}</strong>
                </p>
              </Col>
              <Col lg={13}>
                <p>
                  From : <strong>{booking.bookedTimeSlots.from}</strong>
                </p>
                <p>
                  To: <strong>{booking.bookedTimeSlots.to}</strong>
                </p>
                <p>
                  Transaction Id : <strong>{booking.transcationId}</strong>
                </p>
                <p>
                  Date of Booking:{' '}
                  <strong>
                    {moment(booking.createdAt).format('MM DD yyyy : HH:mm')}
                  </strong>
                </p>
              </Col>
              <Col lg={4}>
                <img
                  style={{ borderRadius: '10px' }}
                  src={booking.car.carImg}
                  alt={booking.car.name}
                  width="220px"
                  height="130px"
                />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default UserBooking;
