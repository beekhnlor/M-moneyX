import React from "react";
import { Link } from "react-router-dom";

import logoImage from "../assets/M moneyX.jpeg"; 

const MainNav = () => {
  return (
    <header className="bg-red-600 rounded-bl-[2rem] border-b-2 border-red-500">
      <div className="flex justify-between items-center h-24">
        <div className="flex items-stretch h-full"> 
          <div className="flex items-center pl-10 pr-6">
            <Link to="/" className="flex items-baseline">
              <h1 className="text-3xl font-extrabold tracking-tight">
          
                <span className="text-[#ffffff]">M-</span>
             
                <span className="text-[#ffffff]">MONEY</span>
              </h1>
            </Link>
          </div>

         
          <div className=" flex items-center justify-center px-5">
            <img 
              src={logoImage} 
              alt="M-MoneyX Logo" 
              className="h-24 w-30" 
            />
          </div>
        
        </div>
        
        <div className="flex items-center gap-7 text-gray-700 font-medium text-base pr-10">
          <Link to="/about" className="hover:text-black transition-colors text-white">
            ກ່ຽວກັບ
          </Link>
          <Link to="/service" className="hover:text-black transition-colors text-white">
            ບໍລິການ
          </Link>
          <Link to="/performance" className="hover:text-black transition-colors text-white">
            ຜົນງານ
          </Link>
          <Link to="/message" className="hover:text-black transition-colors text-white">
            ຂ່າວສານ
          </Link>
          <Link to="/download" className="hover:text-black transition-colors text-white">
            ດາວໂຫຼດ
          </Link>
          <Link to="/login" className="hover:text-black transition-colors text-white">
            ເຂົ້າສູ່ລະບົບ
          </Link>
          <Link to="/chat" className="hover:text-black transition-colors text-white">
            ສົນທະນາ
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNav;