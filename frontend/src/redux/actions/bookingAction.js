import { message } from 'antd';
import axios from 'axios';
import globalAPI from '../../globalApi';

export const bookCarAction = (data) => async (dispatch) =>{ 
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post(globalAPI.bookCar, data);
    message.success(response.data.message); 
      window.location.href="/userbooking"  
  } catch (error) {
    message.error('Something went wrong, please try again later')
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
}

export const getBookingCarAction = () => async (dispatch) =>{ 
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get(globalAPI.getAllBooking);
    dispatch({type : 'GET_BOOKING_CARS', payload : response.data})
  } catch (error) {
    message.error('Something went wrong, please try again later')
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
}