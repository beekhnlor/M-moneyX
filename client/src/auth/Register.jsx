import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
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
        [e.target.user_name]:e.target.value,
    });
};



const handleSubmit = async(e)=>{
    e.prevenDefault();
    try{

    }catch(err){
        console.log()
    }

}
  return (
    <div>
        Register
    </div>
  )
}

export default Register