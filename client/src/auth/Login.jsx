/* import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useMoneyStore from "../store/money-store";
import { useNavigate } from 'react-router-dom'
const Login = () => {
   
  const actionLogin = useMoneyStore((state)=>state.actionLogin)
  const user = useMoneyStore((state)=>state.user)
  // console.log('form zustand',user)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    phone_number: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedireact(role)
      toast.success('welcome')
      // console.log(res)
    }catch(err){
       console.log(err)
       const errMsg = err.response?.data?.message
       toast.error(errMsg)
    }
  };

  const roleRedireact = (role) => {
    if(role === 'admin'){
      navigate('/admin')
    }else{
      navigate('/')
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        phone_number
        <input
          className="border"
          onChange={handleOnChange}
          name="phone_number"
          type="phone_number"
        />
        Password
        <input
          className="border"
          onChange={handleOnChange}
          name="password"
          type="text"
        />
        <button className="bg-gray-100 rounded-md p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
 */
import React, { useState } from "react";
import { toast } from "react-toastify";
import useMoneyStore from "../store/money-store";

import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
  const actionLogin = useMoneyStore((state) => state.actionLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    phone_number: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const userPayload = res.data.payload;
      redirectUser(userPayload, from);
      toast.success('Welcome!');
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "An error occurred.";
      toast.error(errMsg);
    }
  };

  const redirectUser = (user, fromPath) => {
    if (fromPath !== "/" && user.role !== 'admin') {
      navigate(fromPath, { replace: true });
      return;
    }
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phone_number"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleOnChange}
            name="phone_number"
            type="tel" 
            required
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleOnChange}
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ຖ້າຍັງບໍ່ມີບັນຊີ?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            ສະໝັກທີ່ນີ້
          </Link>
        </p>
      </div>

    </div>
  );
};

export default Login;