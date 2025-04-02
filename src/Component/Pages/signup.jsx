import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom"; 
import api from "../../api"
import { toast } from 'react-toastify';
const Signup = () => {
    const [formErrors, setFormErrors] = useState({});
    const [apiError, setApiError] = useState(""); 
    const navigate = useNavigate(); 

    const validate = (values) => {
        let errors = {};

        if (!values.firstname) {
            errors.firstname = "First Name is required";
        } else if (values.firstname.length < 2) {
            errors.firstname = "Too short!";
        }

        if (!values.lastname) {
            errors.lastname = "Last Name is required";
        } else if (values.lastname.length < 2) {
            errors.lastname = "Too short!";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords must match";
        }

        setFormErrors(errors);
        return errors;
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setApiError("");
            const userData = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password
            };
            
            const response = await api.register(userData);
            
            if (response.status === 200) {
                toast.success("Registration successful!");
                resetForm();
                navigate('/signin');
            }
            
        } catch (error) {
            console.error("Registration error:", error);
            setApiError(
                error.message || "Registration failed. Please try again later."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className='login_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            {apiError && (
                                <div className="alert alert-danger" role="alert">
                                    {apiError}
                                </div>
                            )}
                            
                            <Formik
                                initialValues={{
                                    firstname: "",
                                    lastname: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validate={validate}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="form_sign">
                                        <div className="sign_heading">
                                            <h1 className="sign_heading_one">Sign up</h1>
                                            <p className="sign_heading_two">
                                                Get a free 30-minute virtual consultation where you can discuss Strategy, Bank Roll Management, & much more
                                            </p>
                                        </div>
                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="firstname">FIRST NAME</label>
                                            <Field type="text" name="firstname" className="sign_up_two" placeholder="Enter First Name" />
                                            <ErrorMessage name="firstname" component="div" className="error-message" />
                                        </div>

                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="lastname">Last Name</label>
                                            <Field type="text" name="lastname" className="sign_up_two" placeholder="Enter Last Name" />
                                            <ErrorMessage name="lastname" component="div" className="error-message" />
                                        </div>

                                        <div className="sign_up">
                                            <label className="sign_up_one" htmlFor="email">Email ID</label>
                                            <Field type="email" name="email" className="sign_up_two" placeholder="Enter Email" />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="password">Create Password</label>
                                            <Field type="password" name="password" className="sign_up_two" placeholder="Enter Password" />
                                            <ErrorMessage name="password" component="div" className="error-message" />
                                        </div>

                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="confirmPassword">Re-type Password</label>
                                            <Field type="password" name="confirmPassword" className="sign_up_two" placeholder="Re-type Password" />
                                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                        </div>

                                        <button type="submit" className="btn_sign" disabled={isSubmitting}>
                                            {isSubmitting ? "Creating Account..." : "Create Account"}
                                        </button>

                                        <h6 className="sign_account">
                                            Already have an account? <a href="/signin" className="sign_in">Sign in</a>
                                        </h6>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;