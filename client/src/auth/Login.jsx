import React, { useState } from "react";
import { toast } from "react-toastify";
import useMoneyStore from "../store/money-store";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logoImage from "../assets/logo-circle.jpeg";
import logobig from "../assets/logo-big.png"

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
      toast.success('ຍິນດີຕ້ອນຮັບ!');
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message || "ເກີດຂໍ້ຜິດພາດ.";
      toast.error(errMsg);
    }
  };

  const redirectUser = (user, fromPath) => {
    if (fromPath !== "/" && user.role !== 'admin') {
      navigate(fromPath, { replace: true });
      return;
    }
    if (user.role === 'admin') {
      navigate('/admin/chat');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
        
        <div className="hidden md:flex flex-col items-center text-center">
            <img src={logobig} alt="M MoneyX Logo" className="w-96 h-96" />
            
            {/* === ຈຸດທີ່ແກ້ໄຂ === */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 -mt-16">M MoneyX ແມ່ນຫຍັງ?</h2>
            
            <p className="text-gray-600 max-w-md">
                M-Money ແມ່ນກະເປົາເງິນດິຈິຕອນເທິງມືຖື ໂດຍສາມາດໃຊ້ຈ່າຍໄດ້ກັບເງິນສົດ, ນຳໃຊ້ເບີໂທລະສັບ ທຸກເຄືອຂ່າຍ ໃນການລົງທະບຽນ ເຊິ່ງຈະເຮັດໃຫ້ການເຮັດທຸລະກຳການເງິນ ງ່າຍ ສະດວກ ປອດໄພ ໄດ້ມາດຕະຖານ.
            </p>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="text-center">
            <img src={logoImage} alt="M Money Logo" className="mx-auto h-16 w-auto" />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-red-600">
              ຍິນດີຕ້ອນຮັບທ່ານເຂົ້າສູ່ລະບົບ
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="phone_number" className="block text-md font-medium text-gray-700">
                ເບີໂທລະສັບ
              </label>
              <div className="mt-1">
                <input
                  id="phone_number"
                  className="w-full px-3 py-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  onChange={handleOnChange}
                  name="phone_number"
                  type="tel" 
                  required
                  autoComplete="tel"
                  placeholder="ກະະລຸນາປ້ອນເບີໂທ"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-md font-medium text-gray-700">
                ລະຫັດຜ່ານ
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  className="w-full px-3 py-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  onChange={handleOnChange}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="ກະະລຸນາປ້ອນລະຫັດຜ່ານ"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                  ລືມລະຫັດຜ່ານ?
                </Link>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                ເຂົ້າສູ່ລະບົບ
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ທ່ານບໍ່ມີບັນຊີເທື່ອແມ່ນບໍ່ ?{' '}
              <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
                ຄລິກເພື່ອລົງທະບຽນ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;