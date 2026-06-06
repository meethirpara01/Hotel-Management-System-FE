import { useSelector } from 'react-redux'
import './Profile.scss'
import { useRef, useState } from 'react';
import { authActions } from '../../../store/authReducer/authActions';
import { useFormik } from 'formik';
import { validateUpdateProfile } from '../../../utils/validate';
const Profile = () => {

  const currentUser = useSelector((state) => state.auth.user);
  const userBookings = useSelector((state) => state.bookings.userBookings);

  console.log(currentUser);
  console.log(userBookings);

  const userRegisterAt = new Date(currentUser.createdAt);

  let completedStay = 0;
  let cancelleddStay = 0;
  let completedNights = 0;
  userBookings.reduce((accumulator, element, idx) => {
    if (element.status === "COMPLETED") {
      completedStay++;
      const totalNights = Math.ceil((new Date(element.checkOutDate) - new Date(element.checkInDate)) / (1000 * 60 * 60 * 24));
      completedNights += totalNights;
    }
    else if (element.status === "CANCELLED")
      cancelleddStay--;
  }, 0);

  const [activeComponent, setActiveComponent] = useState("PERSONALINFO");


  const { updateUserProfile } = authActions();

  const formik = useFormik({
    initialValues: {
      name: `${currentUser.name}`,
      email: `${currentUser.email}`,
      gender: `${currentUser.gender}`,
      phone: `${currentUser.phone}`,
      address: `${currentUser.address}`,
    },
    validationSchema: validateUpdateProfile,
    onSubmit: async values => {

      const user = {
        name: values.name,
        email: values.email,
        gender: values.gender,
        phone: values.phone,
        address: values.address,
      }

      const data = await updateUserProfile(user);
      if (data.user) {
        toast.success('User Register SuccessFully');
        navigate("/login");
      }
      else {
        toast.error('Something went Wrong! Try Again');
      }
    }
  });

  const activeForm = useRef();
  const handlePersonalInfoClick = () => {
    setActiveComponent('PERSONALINFO');
    activeForm.current.focus();
  }

  const [imageUpdatePopUp, setImageUpdatePopUp] = useState(false);
  const hanldeImageUpdate = () => {
    setImageUpdatePopUp(true);
  }

  return (
    <div className="profile">
      <div className="sideBar">
        <div className="userDetailPart">
          <div className='UserImage'>
            <img src={`http://localhost:3000${currentUser.ProfilePic}`} alt="" />
          </div>
          <div className="UserDetails">
            <h4>{currentUser.name}</h4>
            <p>{currentUser.email}</p>
          </div>
        </div>
        <div className='line'></div>
        <div className='accountPart'>
          <p>ACCOUNT</p>
          <div className="menus">
            <div className='menu' onClick={handlePersonalInfoClick}>
              <i className="ri-user-3-fill icon"></i>
              <p>Personal Info</p>
            </div>
            <div className='menu' onClick={(() => { setActiveComponent('SECURITY') })}>
              <i className="ri-git-repository-private-line icon"></i>
              <p>Security</p>
            </div>
            <div className='menu logout'>
              <i className="ri-logout-box-r-line icon"></i>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mainContent">
        <div className="userDashBoard">
          <div className="themeBackground"></div>
          <div className="profilePic">
            <div className='UserImage' onClick={hanldeImageUpdate}>
              <img src={`http://localhost:3000${currentUser.ProfilePic}`} alt="" />
            </div>
            <button className='editProfileButton' type='button' onClick={handlePersonalInfoClick} ref={activeForm}>Edit Profile</button>
          </div>
          <div className="userContent">
            <div className="UserDetails">
              <h4>{currentUser.name}</h4>
              <p>{currentUser.email}</p>
            </div>
            <div className="tags">
              <div className='customerTag'>
                <i class="iconTag ri-user-line"></i>
                <p>CUSTOMER</p>
              </div>
              <div className='membership'>
                <p>MEMBER SINCE {userRegisterAt.toLocaleString('default', { month: 'short' })} {userRegisterAt.getDate()}</p>
              </div>
            </div>
            <div className="components">
              <div className="singleComp">
                <p>TOTAL BOOKINGS</p>
                <div className="content">
                  <p className='count'>{userBookings.length}</p>
                  <p className='countDetail'>All Time</p>
                </div>
              </div>
              <div className="singleComp">
                <p>COMPLETED STAY</p>
                <div className="content">
                  <p className='count'>{completedNights}</p>
                  <p className='countDetail'>Nights Enjoyed</p>
                </div>
              </div>
              <div className="singleComp">
                <p>COMPLETED</p>
                <div className="content">
                  <p className='count'>{completedStay}</p>
                  <p className='countDetail'>Bookings</p>
                </div>
              </div>
              <div className="singleComp">
                <p>CANCELLED</p>
                <div className="content">
                  <p className='count'>{cancelleddStay}</p>
                  <p className='countDetail'>Bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider">
          <p onClick={(() => { setActiveComponent('PERSONALINFO') })}>Personal Info</p>
          <p onClick={(() => { setActiveComponent('SECURITY') })}>Security</p>
        </div>
        {activeComponent === "PERSONALINFO" ? <div className='personalInfo'>
          <div className="title">
            <p>Personal Info</p>
            <button className='editProfileButton' onClick={handlePersonalInfoClick} ref={activeForm} type='button'>Edit Profile</button>
          </div>
          <div className="line"></div>
          <div className="updationForm">
            <div className="MultipleInputContent">
              <div className="inputContent">
                <label htmlFor="name">Name</label>
                <div className="inputBlock">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    ref={activeForm}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="errorDiv">{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="inputContent">
                <label htmlFor="password">Email Address</label>
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
            </div>
            <div className="MultipleInputContent">
              <div className="inputContent">
                <label htmlFor="name">Gender</label>
                <div className="inputBlock">
                  <input
                    id="gender"
                    name="gender"
                    type="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                  />
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="errorDiv">{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>
              <div className="inputContent">
                <label htmlFor="password">phone</label>
                <div className="inputBlock">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="errorDiv">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="MultipleInputContent">
              <div className="inputContent">
                <label htmlFor="password">Address</label>
                <div className="inputBlock">
                  <input
                    id="address"
                    name="address"
                    type="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="errorDiv">{formik.errors.address}</div>
                  ) : null}
                </div>
              </div>
            </div>
              <button className='savebtn' onClick={formik.handleSubmit} type='submit'>Save</button>
          </div>
        </div> : ''}
      </div>
    </div>
  )
}

export default Profile

// https://www.figma.com/community/file/1592445546300627840/hotelify-hotel-management-admin-dashboard-ui-design-figma
// https://drive.google.com/drive/folders/17W7dAmVI7DvmfwQbSI-7tv3OHU50bZvu?usp=sharing