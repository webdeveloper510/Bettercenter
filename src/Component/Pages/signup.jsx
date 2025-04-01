import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Signup = () => {
    const [formErrors, setFormErrors] = useState({});

    const validate = (values) => {
        let errors = {};

        if (!values.firstName) {
            errors.firstName = "First Name is required";
        } else if (values.firstName.length < 2) {
            errors.firstName = "Too short!";
        }

        if (!values.lastName) {
            errors.lastName = "Last Name is required";
        } else if (values.lastName.length < 2) {
            errors.lastName = "Too short!";
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
    return (
        <>
            <section className='login_page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <Formik
                                initialValues={{
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validate={validate}
                                onSubmit={(values) => {
                                    console.log("Form Submitted:", values);
                                }}
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
                                            <label className="sign_up_one" htmlFor="firstName">FIRST NAME</label>
                                            <Field type="text" name="firstName" className="sign_up_two" placeholder="Enter your Name" />
                                            {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                                        </div>


                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="lastName">Last Name</label>
                                            <Field type="text" name="lastName" className="sign_up_two" placeholder="Enter Last Name" />
                                            {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
                                        </div>


                                        <div className="sign_up">
                                            <label className="sign_up_one" htmlFor="email">Email ID</label>
                                            <Field type="email" name="email" className="sign_up_two" placeholder="Enter Email" />
                                            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                        </div>


                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="password">Create Password</label>
                                            <Field type="password" name="password" className="sign_up_two" placeholder="Enter Password" />
                                            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                                        </div>


                                        <div className="sign_up my-5">
                                            <label className="sign_up_one" htmlFor="confirmPassword">Re-type Password</label>
                                            <Field type="password" name="confirmPassword" className="sign_up_two" placeholder="Re-type Password" />
                                            {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
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
    )
}
export default Signup;