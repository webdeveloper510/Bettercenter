import React from 'react';
const signup = () => {
    return (
        <>
            <section className='backgroung_image'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <form className='form_sign'>
                                <div className='sign_heading'>
                                    <h1 className='sign_heading_one'>Sign up</h1>
                                    <p className='sign_heading_two'>Get a free 30-minute virtual consultation where you can discuss Strategy, Bank Roll Management, & much more</p>
                                </div>
                                <div className='sign_up'>
                                    <label className='sign_up_one' htmlFor="">FIRST NAME</label>
                                    <input type="text" className='sign_up_two' placeholder='Enter your Name' />
                                </div>
                                <div className='sign_up'>
                                    <label className='sign_up_one' htmlFor="">Last Name</label>
                                    <input type="text" className='sign_up_two' placeholder='Enter Last Name' />
                                </div>
                                <div className='sign_up'>
                                    <label className='sign_up_one' htmlFor="">Email ID</label>
                                    <input type="text" className='sign_up_two' placeholder='Enter Email' />
                                </div>
                                <div className='sign_up'>
                                    <label className='sign_up_one' htmlFor="create-password">Create Password</label>
                                    <input 
                                        type="password" 
                                        className='sign_up_two' 
                                        placeholder='Enter Password' 
                                        id="create-password" 
                                    />
                                </div>

                                <div className='sign_up'>
                                    <label className='sign_up_one' htmlFor="confirm-password">Re-type Password</label>
                                    <input 
                                        type="password" 
                                        className='sign_up_two' 
                                        placeholder='Re-type Password' 
                                        id="confirm-password" 
                                    />
                                </div>
                                <button type="submit" className='btn_sign'>Create Account</button>
                                <h6 className='sign_account'>Already have an account? <a href="" className='sign_in'>Sign in</a></h6>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default signup;