import React from 'react';

// === Import รูปภาพและไอคอนที่จำเป็นทั้งหมด ===
import performanceImage from '../assets/robot-books.jpeg'; 
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
// ===    ส่วนประกอบหลักของหน้า Performance (โค้ดเก่าของคุณ)    ===
// =============================================================
const Performance = () => {
  return (
    // ใช้ React Fragment (<>...</>) เพื่อรวมเนื้อหาและ Footer
    <>
      <div className="bg-white min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex justify-center -mt-40">
              <img 
                src={performanceImage} 
                alt="M-Money Mascot" 
                className="w-full h-auto object-contain bottom-56"
              />
            </div>
            <div className="text-gray-800">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
                ຮ່ວມມືກັບອົງການ ອ໋ອກເເຟມ (Oxfam)
              </h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p className="flex">
                  <span className="mr-2 text-xl">•</span>
                  <span>ຊ່ວຍເຫຼືອຄົວເຮືອນຜູ້ທີ່ໄດ້ຮັບຜົນກະທົບຈາກການແຜ່ລະບາດພະຍາດໂຄວິດ 19</span>
                </p>
                <p className="pl-6">
                  - ນະຄອນຫຼວງວຽງຈັນ ເມືອງ ສັງທອງ ປະກອບມີ 7 ບ້ານ 100 ຄົວເຮືອນ : ບ້ານ ຫີນສິ່ວ ມີ 15 ຄົວເຮືອນ, ບ້ານ ປາກແຕບ ມີ 15 ຄົວເຮືອນ, ບ້ານ ແກ້ງໝໍ້ ມີ 15 ຄົວເຮືອນ, ບ້ານ ເພຍລາດ ມີ 20ຄົວເຮືອນ, ບ້ານ ຫີນກອງ ທ່າທນາຄາມ ມີ 10 ຄົວເຮືອນ, ບ້ານ ສຳພັນນາ ມີ 7 ຄົວເຮືອນ, ບ້ານ ຫ້ວຍຕິ້ມ ມີ 18 ຄົວເຮືອນ.
                </p>
                <p className="pl-6">
                  - ແຂວງບໍ່ແກ້ວ ເມືອງຫ້ວຍຊາຍ ປະກອບມີ 6 ບ້ານ 100 ຄົວເຮືອນ : ບ້ານ ນ້ຳເກິ່ງ ມີ 20ຄົວເຮືອນ, ບ້ານ ສີໄພລ ใด ມີ 15 ຄົວເຮືອນ, ບ້ານ ຝາຍ ມີ15 ຄົວເຮືອນ, ບ້ານ ໂຄກຫຼວງ ມີ10 ຄົວເຮືອນ ບ້ານ ພູກາວແຫຼ ใต้ ມີ 15 ຄົວເຮືອນ,ບ້ານ ຫ້ວຍຊາຍນ້ອຍ ມີ 25ຄົວເຮືອນ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === เรียกใช้ Component Footer ที่นี่ === */}
      <Footer />
    </>
  );
}

export default Performance;