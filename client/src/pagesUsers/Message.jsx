import React from 'react';

import serviceGraphic from '../assets/service-graphic.png'; 

const Message = () => {
  return (
    // 1. เพิ่ม 'relative' เพื่อเป็นกรอบอ้างอิงให้รูปภาพ และ 'overflow-hidden' เพื่อกันรูปภาพล้น
    <div className="bg-white min-h-[calc(100vh-80px)] relative overflow-hidden">

      {/* Container นี้จะใช้สำหรับจัดวาง "ข้อความ" เท่านั้น */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-72">
        
        {/* 2. ยกเลิก Grid Layout และจำกัดความกว้างของบล็อกข้อความให้อยู่แค่ครึ่งซ้าย */}
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
        className="absolute bottom-0 right-0 h-auto  w-full max-w-md lg:max-w-lg xl:max-w-xl z-0"
      />

    </div>
  );
}

export default Message;