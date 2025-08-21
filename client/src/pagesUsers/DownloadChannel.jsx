import React from 'react';
import { useNavigate } from 'react-router-dom';

// === Import ໄອຄອນຕ່າງໆທີ່ຕ້ອງໃຊ້ທັງໝົດ ===
import { IoClose } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

// === Import ໂລໂກ້ຕ່າງໆ ===
import mainLogoUrl from '../assets/logo-big.png';
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
// ===     ส่วนประกอบหลักของหน้า Download (โค้ดเก่าของคุณ)    ===
// =============================================================
const DownloadChannel = () => {
  const navigate = useNavigate();

  const infoPoints = [
    'ທຸກການເຮັດທຸລະກຳ ຈະມີການແຈ້ງເຕືອນຈາກແອັບ.',
    'ສາມາດກວດຄືນປະຫວັດການເຮັດທຸລະກຳຍ້ອນຫຼັງໄດ້.',
    'ສາມາດເປີດໂໝດສະແກນລາຍນິ້ວມືເພື່ອເປັນລະຫັດການເຂົ້າແອັບ U.',
    'ກໍລະນີມີການລັກເຂົ້າບັນຊີກະເປົາ M-Money ຈາກໜ່ວຍອື່ນ ຈະມີ OTP ປ້ອນການຢືນຢັນເພື່ອເປັນການ Login ເຂົ້າບັນຊີ (ຖ້າບໍ່ມີການຢືນຢັນ OTP ຈະບໍ່ສາມາດເຂົ້າບັນຊີໄດ້).',
    'ຫາກລືມລະຫັດ ຕັ້ງຄ່າລະຫັດ OTP ຢືນຢັນການເຂົ້າໃຊ້.',
    'ສາມາດເລືອກໄດ້ 4 ພາສາ ອັງກິດ, ລາວ, ຫວຽດນາມ ແລະ ຈີນ.',
    'ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ ໂທ 1101 ໄດ້ຕະຫຼອດ 24 ຊົ່ວໂມງ.',
  ];
  
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.ltcdev.mmoney";

  const handleCancelClick = () => {
    navigate('/'); 
  };

  return (
    // ใช้ React Fragment (<>...</>) เพื่อรวมเนื้อหาและ Footer
    <>
      <div className="bg-white min-h-screen font-sans">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-red-600 text-white p-4 flex justify-between items-center shadow-lg">
              <p className="font-semibold">ທ່ານຕ້ອງການດາວໂຫຼດແອັບ MmoneyX ແມ່ນບໍ່ ?</p>
              <button 
                onClick={handleCancelClick}
                className="text-white hover:text-gray-200"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="bg-white p-3 flex justify-end items-center border border-gray-200 border-t-0">
              <button 
                onClick={handleCancelClick}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded mr-2 hover:bg-gray-400"
              >
                ຍົກເລີກ
              </button>
              <a 
                href={playStoreLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-green-600 text-center"
              >
                ຢືນຢັນ
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center -mt-32">
            <img src={mainLogoUrl} alt="M-Money Main Logo" className="w-1/3 h-auto mb-8" />
            <div className="bg-gray-100 p-8 rounded-2xl max-w-4xl w-full text-gray-700 -mt-40">
              <ul className="space-y-4 list-disc list-inside">
                {infoPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
      
      {/* === เรียกใช้ Component Footer ที่นี่ === */}
      <Footer />
    </>
  );
}

export default DownloadChannel;