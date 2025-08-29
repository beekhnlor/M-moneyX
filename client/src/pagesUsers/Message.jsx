import React from "react";

import serviceGraphic from "../assets/Eart.jpeg";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import footerLogo from "../assets/M moneyX.jpeg";

const infoPoints = [
  "ທຸກການເຮັດທຸລະກຳ ຈະມີການແຈ້ງເຕືອນຈາກແອັບ.",
  "ສາມາດກວດຄືນປະຫວັດການເຮັດທຸລະກຳຍ້ອນຫຼັງໄດ້.",
  "ສາມາດເປີດໂໝດສະແກນລາຍນິ້ວມືເພື່ອເປັນລະຫັດການເຂົ້າແອັບ U.",
  "ກໍລະນີມີການລັກເຂົ້າບັນຊີກະເປົາ M-Money ຈາກໜ່ວຍອື່ນ ຈະມີ OTP ປ້ອນການຢືນຢັນເພື່ອເປັນການ Login ເຂົ້າບັນຊີ (ຖ້າບໍ່ມີການຢືນຢັນ OTP ຈະບໍ່ສາມາດເຂົ້າບັນຊີໄດ້).",
  "ຫາກລືມລະຫັດ ຕັ້ງຄ່າລະຫັດ OTP ຢືນຢັນການເຂົ້າໃຊ້.",
  "ສາມາດເລືອກໄດ້ 4 ພາສາ ອັງກິດ, ລາວ, ຫວຽດນາມ ແລະ ຈີນ.",
  "ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ ໂທ 1101 ໄດ້ຕະຫຼອດ 24 ຊົ່ວໂມງ.",
];

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
          {/* โลโก้และ Social */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img src={footerLogo} alt="M-Money Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-white">M-MONEY</span>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              More Smart Life in Digital Era. ໃຊ້ຊີວິດໃຫ້ງ່າຍຂຶ້ນໃນຍຸກດິຈິຕອນ.
            </p>
            <div className="flex space-x-4 mt-6">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">
              ບໍລິສັດ
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">
              ຊ່ວຍເຫຼືອ
            </h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white tracking-wider uppercase">
              ຕິດຕໍ່ພວກເຮົາ
            </h3>
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
          <p>
            &copy; {new Date().getFullYear()} M-Money by Lao Telecom. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Message = () => {
  return (
    <>
      <div className="bg-white min-h-[calc(100vh-80px)] relative overflow-hidden ">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-56">
          <div className="text-gray-800 md:w-1/2 lg:w-2/5">
            <ol className="space-y-8">
              <li className="flex items-start">
                <span className="text-4xl font-bold text-red-600 mr-4">1.</span>
                <div className="mt-1">
                  <p className="text-lg md:text-xl leading-relaxed">
                    ລະບົບແຈ້ງຂ່າວສານ Notification ໃຫ້ບໍລິການ, ໂປຣໂມຊັນ ແລະ
                    ສິດທິພິເສດຕ່າງໆທີ່ທາງລູກຄ້າຈະໄດ້ຮັບຕະຫຼອດການໃຊ້ງານ.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-4xl font-bold text-red-600 mr-4">2.</span>
                <div className="mt-1">
                  <p className="text-lg md:text-xl leading-relaxed">
                    ຕິດຕາມຂ່າວສານທາງ facebook fanpage M Money ແລະ
                    ຊ່ອງທາງອື່ນໆຫຼາຍຊ່ອງທາງ.
                  </p>
                </div>
              </li>

              <div className="flex flex-col items-center py-48">
                <div className="bg-gray-100 p-8 rounded-2xl max-w-4xl w-full text-gray-700 -mt-40">
                  <ul className="space-y-4 list-disc list-inside">
                    {infoPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ol>
          </div>
        </div>
        <div className="-mb-60">
          <img
            src={serviceGraphic}
            alt="M-Money Service Notifications"
            className="absolute bottom-0 right-0 w-full max-w-4xl z-0 "
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Message;
