import React from 'react';
import performanceImage from '../assets/robot-books.jpeg'; 

const Performance = () => {
  return (
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
  );
}

export default Performance;