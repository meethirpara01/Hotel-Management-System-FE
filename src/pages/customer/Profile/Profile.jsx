import { useSelector } from 'react-redux'
import './Profile.scss'
const Profile = () => {

  const currentUser = useSelector((state) => state.auth.user);

  console.log(currentUser);
  
  return (
    <div className="profile">
      <h4>Profile</h4>
      <div className="UserCart">
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Profile

// https://www.figma.com/community/file/1592445546300627840/hotelify-hotel-management-admin-dashboard-ui-design-figma
// https://drive.google.com/drive/folders/17W7dAmVI7DvmfwQbSI-7tv3OHU50bZvu?usp=sharing