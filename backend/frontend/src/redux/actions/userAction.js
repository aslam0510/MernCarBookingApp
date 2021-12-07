import { message } from 'antd';
import axios from 'axios';
import globalAPI from '../../globalApi';




export const userLogin = (data) => async (dispatch) =>{
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post(globalAPI.useLogin, data);
    localStorage.setItem('user',JSON.stringify(response.data));
    message.success('Login Successfull');
    setTimeout(()=>{
      window.location.href="/"
    },500)
  } catch (error) {
    message.error('Invalid Credentials')
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
}

export const userRegister = (data) => async (dispatch) =>{
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post(globalAPI.userRegister, data);
    message.success(response.data.message);   
    setTimeout(()=>{
      window.location.href="/login"
    },500)
  } catch (err) {
    const error = {...err}
    message.error(error.response.data.message)
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
}