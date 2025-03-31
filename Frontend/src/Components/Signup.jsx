import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Avatar from 'react-avatar';
import axios from 'axios';
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
    setSign((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlefilesubmit = (e) => {
    const file = e.target.files[0];

    if (file) {
      const filepath = URL.createObjectURL(file);
      setAvatar(file);
      console.log(filepath);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('Name', sign.Name);
    formData.append('Email', sign.Email);
    formData.append('Password', sign.Password);
    formData.append('avatar', avatar);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .post('http://localhost:3000/create-user', formData, config)
      .then((response) => {
        console.log('User created:', response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Sign Up!</h1>
        <form onSubmit={handlesubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={sign.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="Email"
              value={sign.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={visible ? 'text' : 'password'}
              name="Password"
              value={sign.Password}
              onChange={handleChange}
              required
            />
            {visible ? (
              <AiOutlineEyeInvisible
                className="password-icon"
                onClick={() => setVisible(false)}
                size={24}
              />
            ) : (
              <AiOutlineEye
                className="password-icon"
                onClick={() => setVisible(true)}
                size={24}
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={visible ? 'text' : 'password'}
              name="ConfirmPassword"
              value={sign.ConfirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="avatar-upload">
            <span>
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="avatar" />
              ) : (
                <Avatar name="Foo Bar" className="h-8 w-8" />
              )}
            </span>
            <label htmlFor="Fileinput">
              Upload your photo
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.png,.jpeg"
                onChange={handlefilesubmit}
                className="sr-only"
              />
            </label>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" value={agree} onChange={() => setAgree((prev) => !prev)} />
            <label htmlFor="terms" className="text-sm text-gray-600">I agree to the terms and conditions</label>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <p className="login-link">
            Already a member? <a href="">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};
