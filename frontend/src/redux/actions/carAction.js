import axios from 'axios';
import globalAPI from './../../globalApi';
import { message } from 'antd';

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get(globalAPI.getAllCars);
    dispatch({ type: 'GET_ALL_CARS', payload: response.data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }

};

export const addNewCarAction = (data) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post(globalAPI.addNewCar, data);
    if(response.data){
      message.success(response.data.message); 
    }

  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }

};

export const editCarAction = (data) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post(globalAPI.editCar, data);
    if(response.data){
      message.success(response.data.message); 
    }

  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }

};

export const deleteCarAction = (data) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post(globalAPI.deleteCar, data);
    if(response.data){
      message.success(response.data.message); 
    }
    window.location.reload()

  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }

};

