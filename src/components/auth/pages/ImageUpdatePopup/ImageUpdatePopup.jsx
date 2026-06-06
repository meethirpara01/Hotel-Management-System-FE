import React, { useRef } from 'react'
import './ImageUpdatePopup.scss'
const ImageUpdatePopup = () => {

  const ProfilePicture = useRef(null);
  return (
    <div className='ImageUpdatePopup'>
      <div className="fileInput">
        <div className="inputContent">
          <Button className='FileInputButton' color='default' variant="dashed" onClick={handleClick}>{formik.values.profilePic ? formik.values.profilePic?.name?.slice(0, 15) : "Select Profile Pic"}</Button>
          <input type="file" name="profilePic" id="profilePic" onChange={(e) => {

            formik.setFieldValue(
              "profilePic",
              e.currentTarget.files[0]
            );
          }} />

          {formik.touched.profilePic && formik.errors.profilePic ? (
            <div className="errorDiv">{formik.errors.profilePic}</div>
          ) : null}

          <button className='savebtn' onClick={formik.handleSubmit} type='submit'>Save</button>
          <button className='savebtn' type='submit'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default ImageUpdatePopup