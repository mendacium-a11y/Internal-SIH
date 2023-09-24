import NavbarMain from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';

import ChatDispaly from './Pages/Chat';
import QuickService from './Pages/QuickService';




function ColorSchemesExample() {
  return (
    <>
      <NavbarMain />

      <Routes>
        <Route path='/' element={<ChatDispaly />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rapidServe' element={<QuickService />} />

      </Routes>


    </>
  );
}

export default ColorSchemesExample;