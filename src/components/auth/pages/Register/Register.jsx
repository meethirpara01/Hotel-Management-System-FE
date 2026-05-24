import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { validateRegister } from '../../../../utils/validate';
import { ToastContainer, toast } from 'react-toastify'
import "../Register/register.scss"
import { Button, ConfigProvider, Flex } from 'antd';
import { authActions } from '../../../../store/authReducer/authActions';
// import { useResponsive } from 'antd-style';

const Register = () => {

  const navigate = useNavigate();

  const fileInputRef = useRef();
  const { registerUser } = authActions();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      profilePic: '',
    },
    validationSchema: validateRegister,
    onSubmit: async values => {

      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "CUSTOMER",
        phone: values.phone,
        ProfilePic: values.profilePic
      }

      const data = await registerUser({ name: values.name, email: values.email, password: values.password, role: "CUSTOMER", phone: values.phone, ProfilePic: fileInputRef.current.files[0] });
      if (data.user) {
        toast.success('User Register SuccessFully');
        navigate("/login");
      }
      else {
        toast.error('Something went Wrong! Try Again');
      }
    }
  })

  const handleClick = (e) => {
    fileInputRef.current.click();
  }

  return (
    <div className="RegisterPage">
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
            <h2>Create your Identity</h2>
          </div>
          <div className="form">
            <div className="inputContent">
              <label htmlFor="name">Fullname</label>
              <div className="inputBlock">
                <input
                  id="name"
                  name="name"
                  type="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="errorDiv">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
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
            {/* <div className="MultipleInputContent"> */}
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
                {formik.touched.password && formik.errors.password ? (
                  <div className="errorDiv">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            {/* <div className="inputContent">
                <label htmlFor="role">Role</label>
                <div className="inputBlock">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  />
                  {formik.touched.role && formik.errors.role ? (
                    <div className="errorDiv">{formik.errors.role}</div>
                  ) : null}
                </div>
              </div> */}
            {/* </div> */}
            <div className="MultipleInputContent">
              <div className="mobileInput">
                <label htmlFor="phone">Mobile  No.</label>
                <div className="inputBlock">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="errorDiv">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
              <div className="fileInput">
                <div className="inputContent">
                  <Button className='FileInputButton' color='default' variant="dashed" onClick={handleClick}>{formik.values.profilePic ? formik.values.profilePic.slice(0, 15) : "Select Profile Pic"}</Button>
                  <div className="fileinputBlock">
                    <input
                      id="profilePicphone"
                      name="profilePic"
                      type="file"
                      ref={fileInputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.profilePic}
                    />
                    {formik.touched.profilePic && formik.errors.profilePic ? (
                      <div className="errorDiv">{formik.errors.profilePic}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <button className="submitBtn" onClick={formik.handleSubmit} type="submit">Submit</button>
          </div>
          <div className="registerLink"><p>Already have an Account?<Link className="menu" to={'/login'}>Login</Link></p></div>
        </div>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default Register