import React from 'react';
const signin = () => {
    return (
        <>
            <section className='backgroung_image'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <form className='form_sign_in'>
                                <div className='sign_heading'>
                                    <h1 className='sign_heading_in'>Sign in</h1>
                                    <p className='sign_heading_in_one'>Welcome to BettorCenter</p>
                                </div>
                                <div className='sign_up'>
                                    <label className='sign_up_one' htmlFor="">Email ID</label>
                                    <input type="text" className='sign_up_two' placeholder='Enter Email' />
                                </div>
                                <div className='sign_up'>
                                <label className='sign_up_one' htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className='sign_up_two' 
                                    placeholder='Enter Password' 
                                    id="password" 
                                />
                            </div>
                                <button type="submit" className='btn_sign_in'>Sign in</button>
                                <div className='btn_link'> 
                                    <a href="" className='sign_in_link forgot_pass'>Forget password </a> <a href="/signup" className='sign_in_link'> create account</a>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}
export default signin;