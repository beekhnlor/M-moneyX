import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
const Register = () => {
  const [ form,setForm ] = useState({
    user_name:"",
    email:"",
    phone_number:"",
    password:"",
});

const handleOnChange = (e) => {
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
}

const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!form.password){
      return alert("Password is required")
    }

    try{
      const res = await axios.post('http://172.24.96.1:8000/api/register',form)
      toast.success(res.data.message)
    }catch(err){
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
}
 
  return (
    <div>
        Register

        <form onSubmit={handleSubmit}>
          user_name
          <input className='border'
          onChange={handleOnChange}
          name='user_name'
          type='text'
          />

          Email
          <input className='border'
          onChange={handleOnChange}
          required
          name='email'
          type='email'
          />

          phone_number
          <input className='border'
          onChange={handleOnChange}
          name='phone_number'
          type='phone_number'
          />

          Password
          <input className='border'
          onChange={handleOnChange}
          name='password'
          type='password'
          />
    

          <button className='bg-gray-100 rounded-md p-2'>
            Register
          </button>
        </form>
    </div>
  )
}

export default Register