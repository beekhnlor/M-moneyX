import React from 'react';

// === Import รูปภาพสำหรับหน้า Service ===
import bcelLogo from '../assets/bank/1.jpeg';
import jdbLogo from '../assets/bank/2.jpeg';
import laoVietBankLogo from '../assets/bank/3.jpeg';
import maruhanLogo from '../assets/bank/4.jpeg';
import stbLogo from '../assets/bank/5.jpeg';
import indochinaLogo from '../assets/bank/6.jpeg';
import bicBankLogo from '../assets/bank/7.jpeg';
import bankbank from '../assets/bank/8.jpeg';
import laoTelecomLogo from '../assets/topups/1.jpeg';
import tplusLogo from '../assets/topups/2.jpeg';
import etlLogo from '../assets/topups/3.jpeg';
import monomaxLogo from '../assets/others/1.jpeg';
import wetvLogo from '../assets/others/2.jpeg';
import footerLogo from '../assets/M moneyX.jpeg';


import { BsDropletFill, BsFillLightningFill, BsRouterFill } from 'react-icons/bs';
import { FaFileInvoiceDollar, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';

import "@fontsource/noto-sans-lao"; 


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
            <p className="mt-4 text-sm text-gray-200 font-lao">
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


const ServiceCard = ({ title, children, buttonText }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col text-center">
      <h2 className="text-xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>
      {buttonText && (
        <div className="mt-8">
          <button className="bg-red-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-red-700 transition-colors">
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
  
  const ServiceItem = ({ icon, label }) => (
    <div className="flex flex-col items-center text-center px-2 w-1/4">
      <div className="w-16 h-16 mb-2 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-sm text-gray-700 mt-1 leading-tight">{label}</p>
    </div>
  );
  
const Service = () => {
  const banks = [
    { name: 'BCEL', logo: bcelLogo }, { name: 'JDB', logo: jdbLogo }, { name: 'Lao Viet Bank', logo: laoVietBankLogo }, { name: 'Maruhan', logo: maruhanLogo }, { name: 'STB', logo: stbLogo }, { name: 'Indochina', logo: indochinaLogo }, { name: 'BIC Bank', logo: bicBankLogo }, { name: 'Bank Bank', logo: bankbank },
  ];
  const topups = [
    { name: 'Lao Telecom', logo: laoTelecomLogo }, { name: 'T PLUS', logo: tplusLogo }, { name: 'ETL', logo: etlLogo },
  ];
  const others = [
    { name: 'Monomax', logo: monomaxLogo }, { name: 'WeTV', logo: wetvLogo },
  ];

  return (
    // ใช้ React Fragment (<>...</>) เพื่อรวมเนื้อหาและ Footer
    <>
      <div className="bg-gray-50 min-h-screen font-sans">
        <main className="container mx-auto p-4 md:p-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServiceCard title="ບໍລິການໂອນເງິນໄປທະນາຄານ">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full">
                {banks.map((bank) => (
                  <div key={bank.name} className="flex justify-center items-center p-2 h-20">
                    <img src={bank.logo} alt={bank.name} className="max-h-12 object-contain"/>
                  </div>
                ))}
              </div>
            </ServiceCard>
            <ServiceCard title="ຊໍາລະໃບບິນ (Bill Payment)" buttonText="ຈ່າຍດ່ວນນີ້">
              <div className="flex justify-around items-start w-full">
                <ServiceItem label="ຊຳລະຄ່ານ້ຳ" icon={ <BsDropletFill className="w-9 h-9 text-blue-500" /> } />
                <ServiceItem label="ຊຳລະຄ່າໄຟ" icon={ <BsFillLightningFill className="w-9 h-9 text-yellow-500" /> } />
                <ServiceItem label="ຊຳລະອິນເຕີເນັດ" icon={ <BsRouterFill className="w-9 h-9 text-gray-600" /> } />
                <ServiceItem label="ຊຳລະສິນເຊື່ອ" icon={ <FaFileInvoiceDollar className="w-9 h-9 text-green-500" /> } />
              </div>
            </ServiceCard>
            <ServiceCard title="ບໍລິການຕື່ມມູນຄ່າໂທ" buttonText="ເຕີມດ່ວນນີ້">
              <div className="flex justify-center items-center space-x-6 w-full">
                {topups.map((item) => (
                  <div key={item.name} className="flex justify-center items-center p-2">
                    <img src={item.logo} alt={item.name} className="max-h-16 object-contain"/>
                  </div>
                ))}
              </div>
            </ServiceCard>
            <ServiceCard title="ບໍລິການອື່ນໆ" buttonText="ເຕີມດ່ວນນີ້">
              <div className="flex justify-around items-start w-full">
                <ServiceItem label="Monomax" icon={<img src={others[0].logo} alt="Monomax" className="h-10 object-contain" />} />
                <ServiceItem label="ບໍລິການເຕີມເກມ" icon={<IoGameController className="w-10 h-10 text-gray-800" />} />
                <ServiceItem label="ບໍລິການເຕີມ TV" icon={<img src={others[1].logo} alt="WeTV" className="h-10 object-contain" />} />
              </div>
            </ServiceCard>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Service;