import React, { useState, useEffect } from "react";
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
