import "../Login/login.scss"
import { Field, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { validateLogin } from "../../../../utils/validate"
import { useSelector } from "react-redux"
import { authActions } from "../../../../store/authReducer/authActions.js"

const Login = () => {

    const navigate = useNavigate();

    const { loginCurrentUser } = authActions();
    const currentUser = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (currentUser) {
            toast.success('User Login SuccessFully');
            navigate("/");
        }
        if (error) {
            toast.error(error)
        }
    }, [currentUser, error])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validateLogin,
        onSubmit: async values => {
            await loginCurrentUser({ email: values.email, password: values.password });
            if (error) {
                toast.error(error)
            }
        }
    })

    return (
        <div className="LoginPage">
            <div className="content">
                <div className="left-part">
                    <h4>ATLANTA</h4>
                    <div className="textContent">
                        <p>Experience comfort beyond expectations.</p>
                        <p>Find the perfect room,</p>
                        <p>and make every moment feel special.</p>
                    </div>

                </div>
                <div className="right-part">
                    <div className="textContent">
                        <h4>Please Enter Your Details</h4>
                        <h2>Welcome Back</h2>
                    </div>

                    <FormikProvider value={formik}>
                        <div className="form">
                            <div className="inputContent">
                                <label htmlFor="email">Email Address</label>
                                <div className="inputBlock">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="errorDiv">{formik.errors.email}</div>
                                    ) : null}
                                </div>

                            </div>

                            <div className="inputContent">
                                <label htmlFor="password">Password</label>
                                <div className="inputBlock">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <p className="forgotPassword"><Link className="forgotPasswordLink" to={'/forgotPassword'}>Forgot Password?</Link></p>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="errorDiv">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </div>

                            {/* <div className="inputContent">
                                <div className="inputBlock">
                                <Field className="selectField" as="select" id="role" name="role">
                                    <option value="">Select a role</option>
                                    <option value="CUSTOMER">CUSTOMER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Field>
                                {formik.touched.role && formik.errors.role ? (
                                    <div className="errorDiv">{formik.errors.role}</div>
                                ) : null}
                                </div>
                            </div> */}
                            <button className="submitBtn" onClick={formik.handleSubmit} type="submit">Submit</button>
                        </div>
                    </FormikProvider>
                    <div className="registerLink"><p>Don't have an Account?<Link className="menu" to={'/register'}>Register</Link></p></div>
                </div>
            </div>
            <ToastContainer position='bottom-right' />
        </div>
    )
}

export default Login


{/* <p>Where hospitality begins and every guest experience matters.</p>
                        <p>Manage stays, service, and smiles all in one place.</p> */}