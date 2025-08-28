import React, { useState } from "react";
import { toast } from "react-toastify";
import useMoneyStore from "../store/money-store";
import { useNavigate, useLocation, Link } from 'react-router-dom';

// === Import รูปภาพและไอคอนที่จำเป็นทั้งหมด ===
import logoImage from "../assets/logo-circle.jpeg";
import logobig from "../assets/logo-big.png";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import footerLogo from '../assets/M moneyX.jpeg'; // โลโก้สำหรับ Footer

// =============================================================
// ===          ส่วนประกอบของ Footer ที่เพิ่มเข้ามา          ===
// =============================================================
const Footer = () => {
  const companyLinks = [
    { name: 'ກ່ຽວກັບພວກເຮົາ', href: '/about' },
    { name: 'ບໍລິການ', href: '/service' },
    { name: 'ຂ່າວສານ', href: '#' },
    { name: 'ຮ່ວມງານກັບພວກເຮົາ', href: '#' },
  ];

  const supportLinks = [
    { name: 'ສູນຊ່ວຍເຫຼືອ', href: '#' },
    { name: 'ຄຳຖາມທີ່ພົບເລື້ອຍ', href: '#' },
    { name: 'ຕິດຕໍ່ພວກເຮົາ', href: '/contact' },
  ];

  return (
    <footer className="bg-red-600 text-white font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img src={footerLogo} alt="M-Money Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-white">M-MONEY</span>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              More Smart Life in Digital Era. ໃຊ້ຊີວິດໃຫ້ງ່າຍຂຶ້ນໃນຍຸກດິຈິຕອນ.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors"><FaWhatsapp size={20} /></a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">ບໍລິສັດ</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-white hover:text-gray-300 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">ຊ່ວຍເຫຼືອ</h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-white hover:text-gray-300 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">ຕິດຕໍ່ພວກເຮົາ</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li>ສຳນັກງານໃຫຍ່ ລາວໂທລະຄົມ</li>
              <li>ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</li>
              <li>ອີເມວ: support@mmoney.la</li>
              <li>ໂທ: 1101</li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-400 opacity-50 my-8" /> 
        <div className="text-center text-sm text-gray-200">
          <p>&copy; {new Date().getFullYear()} M-Money by Lao Telecom. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};


// =============================================================
// ===        ส่วนประกอบหลักของหน้า Login (โค้ดเก่าของคุณ)      ===
// =============================================================
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
        const token = res.data.token; 
  
        if (token) {
          localStorage.setItem('token', token);
        } else {
          console.warn("ไม่พบ Token ใน Response ของการล็อกอิน");
        }
        
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
        navigate('/chat');
      }
    };
  
    return (
    
        <>
            <div className="flex min-h-[calc(85vh-6rem)] items-center bg-white">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
                
                    <div className="hidden md:flex flex-col items-center text-center">
                        <img src={logobig} alt="M MoneyX Logo" className="w-96 h-96" />
                        
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

           
            <Footer />
        </>
    );
};
  
export default Login;