// import React from "react";
// import { Link } from "react-router-dom";
// const MainNav = () => {
//   return (
//     <nav className="bg-gray-100">
//       <div className="mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center gap-4">
//             <Link to={"/"} className="text-2xl font-bold">LOGO</Link>
//             <Link to={"/"}>ໜ້າຫຼັກ</Link>
//             <Link to={"service"}>ບໍລິການ</Link>
//             <Link to={"performance"}>ຂ່າວສານ</Link>
//             <Link to={"about"}>ກ່ຽວກັບ</Link>
//             <Link to={"download"}>ດາວໂຫຼດແອບ</Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link to={"chat"}>ຕິດຕໍ່</Link>
//             <Link to={"register"}>ສະໝັກບັນຊີ</Link>
//             <Link to={"login"}>ເຂົ້າສູ່ລະບົບ</Link>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainNav;
// src/components/MainNav.jsx (แก้ไขตามความต้องการ)

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useMoneyStore from "../store/money-store";

const MainNav = () => {
  const { user, actionLogout } = useMoneyStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    actionLogout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
    
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold text-blue-600">LOGO</Link>
            <div className="hidden sm:flex items-center gap-4 text-gray-600">
              <Link to={"/"} className="hover:text-blue-600">ໜ້າຫຼັກ</Link>
              <Link to={"/service"} className="hover:text-blue-600">ບໍລິການ</Link>
              <Link to={"/performance"} className="hover:text-blue-600">ຂ່າວສານ</Link>
              <Link to={"/about"} className="hover:text-blue-600">ກ່ຽວກັບ</Link>
              <Link to={"/download"} className="hover:text-blue-600">ດາວໂຫຼດແອບ</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
          
            <Link 
                to={"/chat"} 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                ຕິດຕໍ່
            </Link>

            {user && (
    
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-semibold text-purple-600 hover:text-purple-800">
                    Admin Panel
                  </Link>
                )}
                
                <span className="text-sm font-medium text-gray-800">
                  {user.user_name}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                >
                  ອອກຈາກລະບົບ
                </button>
              </>
            )}
   
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;