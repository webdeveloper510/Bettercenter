import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { setAuthToken } from '../../api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          
            navigate('/');
        }
    }, [navigate]);

const handleSubmit = async (values, { setSubmitting }) => {
    try {
        const response = await axios.post("http://54.209.247.111:8000/login", values);
        if (response.data?.status === 200) {
            const user_id = response.data?.user_id;
            const token = response.data?.token;

            if (token) {
                setAuthToken(token);
                localStorage.setItem("user_id", user_id);
                toast.success("Login successful!");
                navigate('/');
            } else {
                console.error("No token found in response");
                toast.error("Login failed: No access token received");
            }
        } else if (response.data?.status === 400) {
            toast.error(response.data?.message || "Login failed");
        } else {
            toast.error("Unexpected response from server");
        }

    } catch (error) {
        console.error("Login error details:", {
            message: error.message,
            response: error.response ? error.response.data : 'No response',
            request: error.request ? 'Request exists' : 'No request',
            config: error.config ? 'Config exists' : 'No config'
        });

        toast.error(`Login failed: ${error.response?.data?.detail || error.message}`);
    } finally {
        setSubmitting(false);
    }
};


    return (
        <>
            <section className='login_page signin_login_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'Password is required';
                                }
                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form className='form_sign_in log_in'>
                                    <div className='sign_heading'>
                                        <h1 className='sign_heading_in'>Sign in</h1>
                                        <p className='sign_heading_in_one'>Welcome to BettorCenter</p>
                                    </div>
                                    <div className='sign_up'>
                                        <label className='sign_up_one' htmlFor='email'>Email ID</label>
                                        <Field type='text' name='email' className='sign_up_two' placeholder='Enter Email' />
                                        <ErrorMessage name='email' component='div' className='error' />
                                    </div>
                                    <div className='sign_up'>
                                        <label className='sign_up_one' htmlFor='password'>Password</label>
                                        <Field type='password' name='password' className='sign_up_two' placeholder='Enter Password' />
                                        <ErrorMessage name='password' component='div' className='error' />
                                    </div>
                                    <button type='submit' className='btn_sign_in' disabled={isSubmitting}>
                                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                                    </button>
                                    <div className='btn_link'>
                                        <a href='' className='sign_in_link forgot_pass'>Forget password</a>
                                        <a href='/signup' className='sign_in_link'>Create account</a>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin;