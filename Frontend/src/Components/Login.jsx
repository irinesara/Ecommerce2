import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import "../Style/Login.css"
export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

  return (
    <div>
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-16 rounded-lg shadow-2xl w-96">
            <h2 className="text-3xl font-bold mb-10 text-center">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">Email</label>
                <input type="email"
                 id="email" 
                 className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" 
                 autoComplete='on'
                 value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>


            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">Password</label>
                <div className="relative">
                <input type={visible ? "text" : "password"} id="password" className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-purple-500" 
                value={password} 

                onChange={(e) => setPassword(e.target.value)} 
                required/>

              {
                visible ?
                <AiOutlineEyeInvisible className="absolute top-4 right-4 text-gray-500 cursor-pointer" 
                onClick={() => setVisible(false)} 
                size={25}/>:
                <AiOutlineEye className="absolute top-4 right-4 text-gray-500 cursor-pointer" 
                onClick={() => setVisible(true)}
                size={25} />
              }


                 
                </div>
            </div>
              <div className="setting-container">
                <div className='remember'>
                    <input type="checkbox"/>
                    <label>Remember me!</label>
                </div>
                <div>
                <div className='forgot-password'>
                <a href="">Forgot Password</a>
                </div>
                </div>
              </div>
            <button className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600">Login</button>

            <div className='newUser'>
              <p>Not a user? <a href="">Create an account</a></p>
            </div>
            </div>
        </div>
    </div>
  )
}