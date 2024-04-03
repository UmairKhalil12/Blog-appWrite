import React, { useState } from 'react';
import { Button, Logo, Input } from '../index';
import authService from '../../appWrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useForm } from 'react-hook-form';


export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const create = async () => {
        setError("")
        try {
            const userData = await authService.CreateAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        }
        catch (error) {
            console.log("error creating user", error.message);
            setError(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto 2-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/`10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]:'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight' >Create your account </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos; already have an account?&nbsp;
                    <Link
                        to='/login'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign in
                    </Link>
                </p>
                {error && (<p className='text-red-600 mt-8 text-center'>{error}</p>)}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            type='text'
                            placeholder='Enter your name'
                            label='Name: '
                            {...register('name', {
                                required: true
                            })}
                        />

                        <Input
                            type='email'
                            placeholder='Enter your email'
                            label='Email: '
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            type='password'
                            placeholder='Enter your password'
                            label='Password:'
                            {...register('password', {
                                required: true
                            })}
                        />
                        <Button type='submit' className='w-full' children='Create Account' />
                    </div>

                </form>
            </div>
        </div>
    )
}
