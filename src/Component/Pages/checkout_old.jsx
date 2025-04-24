import { useState } from "react";
import Faq from "./faq";
import "../../Assets/css/checkout.css";
import cards from "../../Assets/images/Mask group.png"
const Checkout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <>
            <section className="backgroung_image main">
                <div className="container ">
                <h2 className="section-title">Checkout</h2>

                    <div className="row pb-5 checkout_responsive">
                        <div className="col-7 card_checkout ">
                            <h1 className="card_heading text-uppercase fs-6 fw-bold text-white">Order Summary</h1>
                            <div className="card_image">
                                <img src={cards} alt="" width={105} height={105} />
                                <div className="">
                                    <h1 className="text-uppercase fs-4 fw-bold text-white">Louie Diamond's Red
                                        Hots - 1 Day Membership</h1>
                                    <div className="remove-btn">
                                        <p className="remove_tab fs-6">$600.00</p>
                                        <strong className="text-white fs-6">Quantity: 01</strong>
                                        <button className="remove_tab fs-6">Remove</button>
                                    </div>
                                </div>
                            </div>
                            <hr className="card_border" />
                            <div className="card_image">
                                <img src={cards} alt="" width={105} height={105} />
                                <div className="">
                                    <h1 className="text-uppercase fs-4 fw-bold text-white">Louie Diamond's Red
                                        Hots - 1 Day Membership</h1>
                                    <div className="remove-btn">
                                        <p className="remove_tab fs-6">$600.00</p>
                                        <strong className="text-white fs-6">Quantity: 01</strong>
                                        <button className="remove_tab fs-6">Remove</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card_tab">
                                <div className="card_code">
                                    <div className='card_input_get'>
                                        <label className='Discount_Code' htmlFor="">Gift or Discount Code</label>
                                        <input type="text" className='code_type' placeholder='000000' />
                                    </div>
                                    <button className="apply_btn">Apply</button>
                                </div>
                                <div className="card_code">
                                    <p className="Subtotal_heading text-uppercase fs-6 fw-bold">Subtotal</p>
                                    <strong className="Subtotal_heading  fs-6 fw-bold">$140.00</strong>
                                </div>
                                <div className="card_code_one">
                                    <p className="Subtotal_heading text-uppercase fs-6 fw-bold">Tax</p>
                                    <strong className="Subtotal_heading  fs-6 fw-bold">0.00</strong>
                                </div>
                                <hr className="card_border" />
                                <div className="card_code">
                                    <p className="Subtotal_heading text-uppercase fs-6 fw-bold">Total</p>
                                    <strong className="Subtotal_heading  fs-6 fw-bold">$140.00</strong>
                                </div>
                            </div>
                            <div className="secure_btn">
                                <svg className="secure_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                                <button className="ssl_btn fs-6 fw-bold">Secure </button>
                            </div>
                        </div>


                        <div className="col-5 card_responsive">
                            <div className=" card_email">
                                <h1 className="card_heading text-uppercase fs-6 fw-bold text-white">Your Email</h1>
                                <div className="p-3 card_padding">
                                    <div className='card_input '>
                                        <label className='Discount_email' htmlFor="">E-mail</label>
                                        <input type="text" className='email_type' placeholder='jaspreet@codenomad.net' />
                                    </div>
                                    <p className="email_account">You'll receive receipts and notifications at this email
                                        Already have an account?<a href="/signin" className="sign_check">Sign in</a>
                                    </p>
                                    <div className="check_box">
                                        <input type="checkbox" name="" id="" /> <label htmlFor="" className="Sign_check_label">Sign up to receive news and updates</label>

                                    </div>
                                    <button className="Continue_btn">Continue</button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="Additional_Information"
                            >
                                <strong className="Additional_link"> Additional Information</strong>
                                <span>{isOpen ? "" : ""}</span>
                            </button>
                            {isOpen && (
                                <div className=" card_Additional">
                                    <h1 className="card_heading text-uppercase fs-6 fw-bold text-white">Additional Information</h1>
                                    <div className="p-3 card_padding">
                                        <div className='card_input '>
                                            <label className='Discount_email' htmlFor="">Phone</label>
                                            <input type="text" className='email_type' placeholder='6565+6646555' />
                                        </div>

                                        <button className="Continue_btn">Continue</button>
                                    </div>
                                </div>
                            )}


                            <button
                                onClick={() => setOpenIndex(!openIndex)}
                                className="Additional_Information"
                            >
                                <strong className="Additional_link"> Payment & Discounts</strong>
                                <span>{openIndex ? "" : ""}</span>
                            </button>
                            {openIndex && (<div>
                                ytty
                            </div>)}
                        </div>

                    </div>
                    <Faq/>
                </div>

             
         
            </section>

        </>
    )
}


export default Checkout;