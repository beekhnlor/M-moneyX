import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- โลโก้สำหรับหน้า Register ---
import logoBig from '../assets/logo-big.png';
import logoCircle from '../assets/logo-circle.jpeg'; 

// === 1. IMPORT ที่จำเป็นสำหรับ FOOTER (คัดลอกมา) ===
import footerLogo from '../assets/M moneyX.jpeg';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';


// =============================================================
// ===          2. COMPONENT FOOTER (คัดลอกมา)              ===
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
// ===        COMPONENT REGISTER (โค้ดหลักของคุณ)            ===
// =============================================================
const Register = () => {
    const [form, setForm] = useState({
        user_name: "",
        phone_number: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.user_name || !form.phone_number || !form.password) {
            return toast.error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
        }

        try {
            const res = await axios.post('http://172.24.96.1:8000/api/register', form);
            toast.success(res.data.message || 'ລົງທະບຽນສຳເລັດ!');
            navigate('/login'); 
        } catch (err) {
            const errMsg = err.response?.data?.message || 'ເກີດຂໍ້ຜິດພາດໃນການລົງທະບຽນ';
            toast.error(errMsg);
            console.error(err);
        }
    }

    return (
       
        <>
            <div className="bg-white font-sans flex items-center justify-center">
                <main className="container mx-auto flex items-center justify-center py-10 px-4">
                    <div className="flex w-full max-w-6xl">

                        <div className="hidden lg:flex w-1/2 items-center justify-center">
                            <img 
                                src={logoBig} 
                                alt="M Money Large Logo" 
                                className="w-96 h-auto drop-shadow-lg" 
                            />
                        </div>

                        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                            <div className="w-full max-w-md">
                                <div className="flex justify-center mb-6">
                                    <img 
                                        src={logoCircle} 
                                        alt="M Money X Logo" 
                                        className="w-20 h-20" 
                                    />
                                </div>
                                <h2 className="text-center text-2xl font-bold text-red-600 mb-6">
                                    ລົງທະບຽນເຂົ້າສູ່ລະບົບ
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* ... input fields ... */}
                                    <div>
                                        <label htmlFor="user_name" className="text-sm font-medium text-gray-800">
                                            ຊື່ ແລະ ນາມສະກຸນ
                                        </label>
                                        <input
                                            id="user_name"
                                            name="user_name"
                                            type="text"
                                            onChange={handleOnChange}
                                            value={form.user_name}
                                            placeholder="ກະ​ລຸ​ນາ​ປ້ອນ​ຊື່ ແລະ ນາມ​ສະ​ກຸນ"
                                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone_number" className="text-sm font-medium text-gray-800">
                                            ເບີໂທລະສັບ
                                        </label>
                                        <input
                                            id="phone_number"
                                            name="phone_number"
                                            type="tel"
                                            onChange={handleOnChange}
                                            value={form.phone_number}
                                            placeholder="ກະ​ລຸ​ນາ​ປ້ອນເບີໂທ"
                                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="text-sm font-medium text-gray-800">
                                            ສ້າງລະຫັດຜ່ານ
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleOnChange}
                                            value={form.password}
                                            placeholder="ກະ​ລຸ​ນາ​ປ້ອນລະ​ຫັດ​ຜ່ານ"
                                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="flex items-center gap-4 pt-4">
                                        <button
                                            onClick={() => navigate('/login')}
                                            type="button" 
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                        >
                                            ກັບຄືນ
                                        </button>
                                        <button
                                          
                                            type="submit" 
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            ລົງທະບຽນ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            {/* === 3. เรียกใช้ FOOTER ที่นี่ === */}
            <Footer />
        </>
    );
}

export default Register;