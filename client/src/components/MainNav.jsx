import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Menu, X } from "lucide-react";
import useMoneyStore from '../store/money-store';

import moneyXLogo from "../assets/M moneyX.jpeg"; 

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useMoneyStore((state) => state.token);
  const actionLogout = useMoneyStore((state) => state.actionLogout);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    actionLogout(); 
    navigate('/');    
  };

  return (
    <header className="bg-red-600 rounded-bl-[2rem] relative shadow-md">
      <div className="flex justify-between items-center h-24 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/" className="flex items-center h-full">
          <div className="flex items-center pr-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              M-MONEY
            </h1>
          </div>
          
          <div className="bg-red-400 h-full flex items-center justify-center px-5">
            <img 
              src={moneyXLogo} 
              alt="M-MoneyX Logo" 
              className="h-16 w-auto"
            />
          </div>
        </Link>
      
        <nav className="hidden lg:flex items-center gap-2 text-white font-semibold">
  
          <Link to="/service" className="hover:bg-red-700 p-3 rounded-md transition-colors">
            ບໍລິການ
          </Link>
          <Link to="/performance" className="hover:bg-red-700 p-3 rounded-md transition-colors">
            ຜົນງານ
          </Link>
          <Link to="/message" className="hover:bg-red-700 p-3 rounded-md transition-colors">
            ຂ່າວສານ
          </Link>
          <Link to="/download" className="hover:bg-red-700 p-3 rounded-md transition-colors">
            ດາວໂຫຼດ
          </Link>
          <Link to={token ? "/chat" : "/login"} className="hover:bg-red-700 p-3 rounded-md transition-colors">
            ສົນທະນາ
          </Link>
          <Link to="/about" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ກ່ຽວກັບ
          </Link>
        
          {token ? (
            <button onClick={handleLogout} className="hover:bg-red-700 p-3 rounded-md transition-colors">
              ອອກຈາກລະບົບ
            </button>
          ) : (
            <Link to="/login" className="hover:bg-red-700 p-3 rounded-md transition-colors">
              ເຂົ້າສູ່ລະບົບ
            </Link>
          )}
        </nav>

        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 w-full bg-red-600 border-t-2 border-red-500 flex flex-col items-center gap-4 py-4 z-50">
          
          <Link to="/service" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ບໍລິການ
          </Link>
          <Link to="/performance" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ຜົນງານ
          </Link>
          <Link to="/message" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ຂ່າວສານ
          </Link>
          <Link to="/download" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ດາວໂຫຼດ
          </Link>
          <Link to={token ? "/chat" : "/login"} className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ສົນທະນາ
          </Link>
          <Link to="/about" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
            ກ່ຽວກັບ
          </Link>
          
          {token ? (
            <button 
              onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
              className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg"
            >
              ອອກຈາກລະບົບ
            </button>
          ) : (
            <Link to="/login" className="hover:bg-red-700 p-2 rounded-md transition-colors text-white text-lg" onClick={() => setIsMenuOpen(false)}>
              ເຂົ້າສູ່ລະບົບ
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default MainNav;