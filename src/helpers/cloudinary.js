import axios from 'axios';

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImageCloudinary = async(image)=>{
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'mern_app');
  const res = await axios.post(url, formData);
  return res;
}


export default uploadImageCloudinary;