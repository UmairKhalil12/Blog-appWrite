import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';

function LogOutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () =>{
        authService.Logout().then(()=>{
            dispatch((logout()))
        })
        .catch((error)=>{
            console.log('error logging out' , error.message);
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logOutHandler}
    >
      Logout
    </button>
  )
}

export default LogOutBtn;
