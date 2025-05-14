import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from 'react-toastify';

const Signup = () => {
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const navigate = useNavigate();

    // Initial form values
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    // Form validation
    const validateForm = async (values) => {
        const errors = {};

        // First name validation
        if (!values.firstname) {
            errors.firstname = "First name is required";
        } else if (values.firstname.length < 2) {
            errors.firstname = "First name must be at least 2 characters";
        }

        // Last name validation
        if (!values.lastname) {
            errors.lastname = "Last name is required";
        } else if (values.lastname.length < 2) {
            errors.lastname = "Last name must be at least 2 characters";
        }

        // Email validation
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        } else {
           

        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords must match";
        }

        return errors;
    };
const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
        setStatus(null);
        
        const userData = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password
        };
        
        const response = await api.register(userData);
        console.log("🚀 ~ handleSubmit ~ response:", response)

        if (response.status === 200) {
            toast.success("Registration successful!");
            resetForm();
            navigate('/signin');
        } else if (response.status === 400) {
            const errorMessage = response.message || "Registration failed. Please check your input.";
            setStatus({ error: errorMessage });
        } else {
            setStatus({ error: "Registration failed. Please try again later." });
        }

    } catch (error) {
        console.error("Registration error:", error);
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
        setStatus({ error: errorMessage });
    } finally {
        setSubmitting(false);
    }
};


    return (
        <section className="login_page">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Formik
                            initialValues={initialValues}
                            validate={validateForm}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, status }) => (
                                <Form className="form_sign">
                                    <div className="sign_heading">
                                        <h1 className="sign_heading_one">Sign up</h1>
                                        <p className="sign_heading_two">
                                            Get a free 30-minute virtual consultation where you can discuss Strategy, Bank Roll Management, & much more
                                        </p>
                                    </div>

                                    {/* Display API errors */}
                                    {status && status.error && (
                                        <div className="alert alert-danger" role="alert">
                                            {status.error}
                                        </div>
                                    )}

                                    {/* First Name */}
                                    <div className="sign_up my-5">
                                        <label className="sign_up_one" htmlFor="firstname">First Name</label>
                                        <Field 
                                            type="text" 
                                            name="firstname" 
                                            className="sign_up_two" 
                                            placeholder="Enter First Name" 
                                        />
                                        <ErrorMessage name="firstname" component="div" className="error-message" />
                                    </div>

                                    {/* Last Name */}
                                    <div className="sign_up my-5">
                                        <label className="sign_up_one" htmlFor="lastname">Last Name</label>
                                        <Field 
                                            type="text" 
                                            name="lastname" 
                                            className="sign_up_two" 
                                            placeholder="Enter Last Name" 
                                        />
                                        <ErrorMessage name="lastname" component="div" className="error-message" />
                                    </div>

                                    {/* Email */}
                                    <div className="sign_up">
                                        <label className="sign_up_one" htmlFor="email">Email ID</label>
                                        <Field 
                                            type="email" 
                                            name="email" 
                                            className="sign_up_two" 
                                            placeholder="Enter Email" 
                                        />
                                        {isCheckingEmail && <div className="info-message">Checking email availability...</div>}
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>

                                    {/* Password */}
                                    <div className="sign_up my-5">
                                        <label className="sign_up_one" htmlFor="password">Create Password</label>
                                        <Field 
                                            type="password" 
                                            name="password" 
                                            className="sign_up_two" 
                                            placeholder="Enter Password" 
                                        />
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="sign_up my-5">
                                        <label className="sign_up_one" htmlFor="confirmPassword">Re-type Password</label>
                                        <Field 
                                            type="password" 
                                            name="confirmPassword" 
                                            className="sign_up_two" 
                                            placeholder="Re-type Password" 
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                    </div>

                                    {/* Submit Button */}
                                    <button 
                                        type="submit" 
                                        className="btn_sign" 
                                        disabled={isSubmitting || isCheckingEmail}
                                    >
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
    );
};

export default Signup;