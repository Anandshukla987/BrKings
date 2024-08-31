import React from 'react'
import {loginBox, selectAuthUser, logout } from '../../../Redux/Slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginoutBtn = ({flag}) => {
    const dispatch = useDispatch();


    return (
        <>
            {flag ?
                (<div className='btn text-black font-semibold bg-orange-600 lg:mx-4 transform transition duration-300 hover:scale-110'>
                    <button onClick={()=>dispatch(logout())}>
                        Logout
                    </button>
                </div>)
                :
                (<div className='btn text-orange-600 lg:mr-4 transform transition duration-300 hover:scale-110'>
                    <button onClick={() => dispatch(loginBox())} >
                        Login
                    </button>
                </div>)
            }
        </>
    )
}

export default LoginoutBtn