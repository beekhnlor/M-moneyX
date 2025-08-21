import React from 'react';

// === Import ໄອຄອນຕ່າງໆທີ່ຕ້ອງໃຊ້ທັງໝົດ ===
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

import logo from '../assets/M moneyX.jpeg'; 

const Footer = () => {
  const companyLinks = [
    { name: 'ກ່ຽວກັບພວກເຮົາ', href: '/about', },
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
              <img src={logo} alt="M-Money Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-white">M-MONEY</span>
            </div>
            <p className="mt-4 text-sm text-white">
              More Smart Life in Digital Era. ໃຊ້ຊີວິດໃຫ້ງ່າຍຂຶ້ນໃນຍຸກດິຈິຕອນ.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-gray-600 transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="text-white hover:text-gray-600 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-white hover:text-gray-600 transition-colors"><FaWhatsapp size={20} /></a>
              <a href="#" className="text-white hover:text-gray-600 transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">ບໍລິສັດ</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-red-500 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">ຊ່ວຍເຫຼືອ</h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-red-500 transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">ຕິດຕໍ່ພວກເຮົາ</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-white-400">ສຳນັກງານໃຫຍ່ ລາວໂທລະຄົມ</li>
              <li className="text-white">ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</li>
              <li className="text-white">ອີເມວ: support@mmoney.la</li>
              <li className="text-white">ໂທ: 1101</li>
            </ul>
          </div>
        </div>
        <hr className="text-white my-8" />
        <div className="text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} M-Money by Lao Telecom. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};


const Contact = () => {
  return (
    <>
      <div className="bg-white font-sans">
        <main className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-semibold text-red-600">
                ຜູ້ພັດທະນາເວັບໄຊ
              </h2>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight font-sans">
                ຕິດຕໍ່ພວກເຮົາ
              </h1>
              <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
                ເວັບໄຊນີ້ຖືກພັດທະນາໂດຍ ທ້າວ ຄອນສະຫວັນ ແລະ ນາງ ຍ້າ. ຫາກທ່ານມີຄຳຖາມ, 
                ຂໍ້ສະເໜີແນະ, ຫຼື ຕ້ອງການສອບຖາມກ່ຽວກັບການບໍລິການພັດທະນາເວັບໄຊ 
                ສາມາດຕິດຕໍ່ພວກເຮົາໄດ້ຕາມຊ່ອງທາງລຸ່ມນີ້.
              </p>
              <div className="mt-10 text-left inline-block">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <FaPhoneAlt className="text-red-500 w-5 h-5 mr-4" />
                    <span className="text-gray-700 text-lg">[020 54974375]</span>
                  </li>
                  <li className="flex items-center">
                    <FaEnvelope className="text-red-500 w-5 h-5 mr-4" />
                    <span className="text-gray-700 text-lg">[khonesavanh@gmail.com]</span>
                  </li>
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="text-red-500 w-5 h-5 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">[Nonsaart]</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full h-96 md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.111818228189!2d102.6079948751786!3d17.97120398301594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312468611b8b6939%3A0xf6f5481a5b82144b!2sLao%20Telecom%20Head%20Office!5e0!3m2!1sen!2sth!4v1724228498808!5m2!1sen!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-xl"
              ></iframe>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Contact;