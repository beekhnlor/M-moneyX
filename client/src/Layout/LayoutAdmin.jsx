import React from 'react'
import { Outlet } from "react-router-dom";
import HeaderAdmin from '../components/admin/HeaderAdmin';
const LayoutAdmin = () => {
  return (
    <div>
      <HeaderAdmin/>
      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet/>
      </main>
    </div>
  )
}

export default LayoutAdmin