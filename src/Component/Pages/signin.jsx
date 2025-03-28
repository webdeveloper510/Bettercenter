import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
const signin = () => {
    
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
          console.log("Submitting values:", values);
    
          const response = await axios.post("http://54.174.64.250:8000/login", values);
          
          console.log("Full API Response:", response);
          console.log("Response Data:", response.data);
    
          console.log("Stringified Response Data:", JSON.stringify(response.data));
    
          let token;
          if (typeof response.data === 'object') {
            token = 
              response.data.access_token || 
              response.data.token || 
              response.data.accessToken ||
              (response.data.data && response.data.data.token);
          } else if (typeof response.data === 'string') {
            token = response.data;
          }
    
          console.log("Extracted Token:", token);
    
          if (token) {
            const tokenString = typeof token === 'object' 
              ? JSON.stringify(token) 
              : String(token);
    
            localStorage.setItem("access_token", tokenString);
            
            const storedToken = localStorage.getItem("access_token");
            console.log("Stored Token:", storedToken);
            
            alert("Login successful!");
          } else {
            console.error("No token found in response");
            console.error("Response data structure:", response.data);
            alert("Login failed: No access token received");
          }
        } catch (error) {
          console.error("Login error details:", {
            message: error.message,
            response: error.response ? error.response.data : 'No response',
            request: error.request ? 'Request exists' : 'No request',
            config: error.config ? 'Config exists' : 'No config'
          });
    
          alert(`Login failed: ${error.message}`);
        } finally {
          setSubmitting(false);
        }
      };
    
      const checkStoredToken = () => {
        const token = localStorage.getItem("access_token");
        console.log("Current stored token:", token);
        return token;
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
                            {({ touched, errors }) => (
                                <Form className='form_sign_in'>
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
                                    <button type='submit' className='btn_sign_in'>Sign in</button>
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
export default signin;