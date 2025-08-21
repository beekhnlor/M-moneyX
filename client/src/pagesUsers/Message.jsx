import React from 'react';

// === Import รูปภาพและไอคอนที่จำเป็นทั้งหมด ===
import serviceGraphic from '../assets/sharp_mobile_purchase.svg'; 
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

const Message = () => {
  return (
    <>
      <div className="bg-white min-h-[calc(100vh-80px)] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-72">
          <div className="text-gray-800 md:w-1/2 lg:w-2/5">
            <ol className="space-y-8">
              <li className="flex items-start">
                <span className="text-4xl font-bold text-red-600 mr-4">1.</span>
                <div className="mt-1">
                  <p className="text-lg md:text-xl leading-relaxed">
                    ລະບົບແຈ້ງຂ່າວສານ Notification ໃຫ້ບໍລິການ, ໂປຣໂມຊັນ ແລະ ສິດທິພິເສດຕ່າງໆທີ່ທາງລູກຄ້າຈະໄດ້ຮັບຕະຫຼອດການໃຊ້ງານ.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-4xl font-bold text-red-600 mr-4">2.</span>
                <div className="mt-1">
                  <p className="text-lg md:text-xl leading-relaxed">
                    ຕິດຕາມຂ່າວສານທາງ facebook fanpage M Money ແລະ ຊ່ອງທາງອື່ນໆຫຼາຍຊ່ອງທາງ.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <img 
          src={serviceGraphic} 
          alt="M-Money Service Notifications" 
          className="absolute bottom-6 right-0 h-auto w-full max-w-5xl z-0"
        />
      </div>

  
      <Footer />
    </>
  );
}

export default Message;