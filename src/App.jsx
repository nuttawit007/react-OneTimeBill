import './App.css'
import { useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import MenuList from './components/MenuList/MenuList'
import PeopleList from './components/PeopleList/PeopleList'


function App() {
  const [menuListData, setMenuListData] = useState({
    basePeople: [],
    menuItems: [],
    setting: {
      vat: false,
      serviceCharge: false
    }
  });

  const totalPrice = (() => {
    const {menuItems = [], setting = {vat: false, serviceCharge: false}} = menuListData || {};
    let total = 0;
    menuItems.forEach((item) => {
      total += item.price;
    });
    if (setting.vat) {
      total += total * 0.07;
    }
    if (setting.serviceCharge) {
      total += total * 0.10;
    }
    return total.toFixed(2);
  })();

  return (
    <>
      <div className='text-left mb-4'>Total : {totalPrice}</div>
      <BrowserRouter>
        {/* Navigation */}
        <Navbar/>

        {/* Routes */}
        <Routes>
          {/* เข้า / redirect ไป /menu */}
          <Route path="/" element={<Navigate to="/menu" replace />} />

          <Route path="/menu" element={<MenuList value={menuListData} onChange={setMenuListData} />} />
          <Route path="/people" element={<PeopleList value={menuListData} onChange={setMenuListData} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
