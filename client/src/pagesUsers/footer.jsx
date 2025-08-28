// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import footerLogo from "../assets/M moneyX.jpeg";

const Footer = () => {
  const companyLinks = [
    { name: "ກ່ຽວກັບພວກເຮົາ", href: "/about" },
    { name: "ບໍລິການ", href: "/service" },
    { name: "ຂ່າວສານ", href: "#" },
    { name: "ຮ່ວມງານກັບພວກເຮົາ", href: "#" },
  ];

  const supportLinks = [
    { name: "ສູນຊ່ວຍເຫຼືອ", href: "#" },
    { name: "ຄຳຖາມທີ່ພົບເລື້ອຍ", href: "#" },
    { name: "ຕິດຕໍ່ພວກເຮົາ", href: "/contact" },
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
              <a href="#" className="hover:text-gray-300"><FaFacebookF size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaWhatsapp size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold tracking-wider uppercase">ບໍລິສັດ</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gray-300">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold tracking-wider uppercase">ຊ່ວຍເຫຼືອ</h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-gray-300">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold tracking-wider uppercase">ຕິດຕໍ່ພວກເຮົາ</h3>
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

export default Footer;
