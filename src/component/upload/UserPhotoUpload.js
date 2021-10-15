import React, { Fragment } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';

const UserPhotoUpload = ({ userPhoto, setUserPhoto, setLoading }) => {
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const fileUploadAndResize = async (e) => {
    //resizeFile
    let file = e.target.files[0];

    if (file) {
      try {
        setLoading(true);
        const image = await resizeFile(file);
        const res = await axios.post(
          `${process.env.REACT_APP_API}/upload-images`,
          { image },
          { withCredentials: true }
        );
        setUserPhoto(res.data);
      } catch (error) {
        console.log('From user upload photo', error.response);
      }
      setLoading(false);
    }
  };

  const handleImageRemove = async (public_id) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id },
        { withCredentials: true }
      );
      setUserPhoto(null);
      setLoading(false);
    } catch (error) {
      console.log('From remove image', error.response);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {userPhoto && (
        <div className='m-2'>
          <Badge
            count='x'
            onClick={() => handleImageRemove(userPhoto.public_id)}
            style={{ cursor: 'pointer' }}
          >
            <Avatar src={userPhoto.url} size={100} shape='square' />
          </Badge>
        </div>
      )}
      <div className='row'>
        <div className='col'>
          <label className='btn btn-primary btn-raised m-2'>
            Choose Images
            <input
              type='file'
              multiple
              accept='images/*'
              hidden
              onChange={fileUploadAndResize}
            />
          </label>
        </div>
      </div>
    </Fragment>
  );
};

export default UserPhotoUpload;
