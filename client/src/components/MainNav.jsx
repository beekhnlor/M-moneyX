import React from "react";
import { Link } from "react-router-dom";
const MainNav = () => {
  return (
    <nav className="bg-gray-100">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-2xl font-bold">LOGO</Link>
            <Link to={"/"}>ໜ້າຫຼັກ</Link>
            <Link to={"service"}>ບໍລິການ</Link>
            <Link to={"performance"}>ຂ່າວສານ</Link>
            <Link to={"about"}>ກ່ຽວກັບ</Link>
            <Link to={"download"}>ດາວໂຫຼດແອບ</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to={"chat"}>ຕິດຕໍ່</Link>
            <Link to={"register"}>ສະໝັກບັນຊີ</Link>
            <Link to={"login"}>ເຂົ້າສູ່ລະບົບ</Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
