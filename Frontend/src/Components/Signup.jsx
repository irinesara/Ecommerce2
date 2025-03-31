import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Avatar from 'react-avatar';
import axios from 'axios'
import { MdAccountCircle } from "react-icons/md";
import "../Style/Signup.css"

export const Signup = () => {
  const [sign, setSign] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [visible, setVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSign(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handlefilesubmit = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);

    if (file) {
      const filepath = URL.createObjectURL(file);
      setAvatar(file);
      console.log("File path:", filepath);
    } else {
      console.error("No file selected");
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      console.error("No avatar file selected");
      return;
    }

    const formData = new FormData();

    formData.append('Name', sign.Name);
    formData.append('Email', sign.Email);
    formData.append('Password', sign.Password);
    formData.append('avatar', avatar);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/create-user', formData, config);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-heading">Sign Up!</h1>
        <form className="signup-form" onSubmit={handlesubmit}>
          <div className="signup-input-group">
            <label htmlFor="Name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={sign.Name}
              onChange={handleChange}
              required
              className="signup-input"
            />
          </div>

          <div className="signup-input-group">
            <label htmlFor="Email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="Email"
              value={sign.Email}
              onChange={handleChange}
              required
              className="signup-input"
            />
          </div>

          <div className="signup-input-group">
            <label htmlFor="Password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type={visible ? "text" : "password"}
              name="Password"
              value={sign.Password}
              onChange={handleChange}
              required
              className="signup-input"
            />
            {visible ? (
              <AiOutlineEyeInvisible
                className="password-visibility-icon"
                onClick={() => setVisible(false)}
                size={24}
              />
            ) : (
              <AiOutlineEye
                className="password-visibility-icon"
                onClick={() => setVisible(true)}
                size={24}
              />
            )}
          </div>

          <div className="signup-input-group">
            <label htmlFor="ConfirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={visible ? "text" : "password"}
              name="ConfirmPassword"
              value={sign.ConfirmPassword}
              onChange={handleChange}
              required
              className="signup-input"
            />
          </div>

          <div>
            <label htmlFor="avatar" className='block text-sm font-medium text-gray-700'></label>
            <div className='upload-avatar-container'>
              <span className='avatar-preview'>
                {avatar ? (<img src={URL.createObjectURL(avatar)} alt="Avatar" />) : (<MdAccountCircle className="h-8 w-8" />)}
              </span>
              <label htmlFor="file-input" className='upload-avatar-button'>
                <span>Upload your photo</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept='.jpg,.png,.jpeg'
                  onChange={handlefilesubmit}
                  className='sr-only'
                />
              </label>
            </div>
          </div>

          <div className="signup-checkbox">
            <input type="checkbox" value={agree} onChange={() => setAgree(prev => !prev)} />
            <label htmlFor="terms" className="text-sm text-gray-600">I agree to the terms and conditions</label>
          </div>

          <button
            type="submit"
            className="signup-submit-btn"
          >
            Submit
          </button>

          <p className="login-link">Already a member? <a href="">Log in</a></p>
        </form>
      </div>
    </div>
  );
};
