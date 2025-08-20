import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useMoneyStore from '../store/money-store'; // ✨ NEW: 1. ນຳເຂົ້າ Zustand store

import logoImage from "../assets/M moneyX.jpeg"; 

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useMoneyStore((state) => state.token); // ✨ NEW: 2. ດຶງ token ຈາກ store

  return (
    <header className="bg-red-600 rounded-bl-[2rem] border-b-2 border-red-500 relative">
      <div className="flex justify-between items-center h-24 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === ສ່ວນຂອງ Logo === */}
        <div className="flex items-stretch h-full"> 
          <div className="flex items-center pl-2 pr-4 sm:pl-10 sm:pr-6">
            <Link to="/" className="flex items-baseline">
              <h1 className="text-3xl font-extrabold tracking-tight">
                <span className="text-[#ffffff]">M-</span>
                <span className="text-[#ffffff]">MONEY</span>
              </h1>
            </Link>
          </div>
          <div className="hidden sm:flex items-center justify-center px-5">
            <img 
              src={logoImage} 
              alt="M-MoneyX Logo" 
              className="h-24 w-30" 
            />
          </div>
        </div>
        
        {/* === ເມນູສຳລັບ Desktop === */}
        <nav className="hidden lg:flex items-center gap-7 text-gray-700 font-medium text-base">
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
          <Link to={token ? "/chat" : "/login"} className="hover:text-black transition-colors text-white">
            ສົນທະນາ
          </Link>
        </nav>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>


      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 w-full bg-red-600 border-t-2 border-red-500 flex flex-col items-center gap-4 py-4 z-50">
          <Link to="/about" className="hover:text-gray-400 transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ກ່ຽວກັບ
          </Link>
          <Link to="/service" className="hover:text-gray-400  transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ບໍລິການ
          </Link>
          <Link to="/performance" className="hover:text-gray-400  transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ຜົນງານ
          </Link>
          <Link to="/message" className="hover:text-gray-400  transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ຂ່າວສານ
          </Link>
          <Link to="/download" className="hover:text-gray-400  transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ດາວໂຫຼດ
          </Link>
          <Link to="/login" className="hover:text-gray-400  transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ເຂົ້າສູ່ລະບົບ
          </Link>
  
          <Link to={token ? "/chat" : "/login"} className="hover:text-gray-400  transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ສົນທະນາ
          </Link>
        </nav>
      )}
    </header>
  );
};

export default MainNav;