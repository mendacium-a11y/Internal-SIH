import NavbarMain from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import ChatDispaly from './Pages/Chat';
import QuickService from './Pages/QuickService';
import UserState from './context/user/UserState';
import NearMe from './Pages/NearMe';





function ColorSchemesExample() {
  return (
    <>
      <UserState>

        <NavbarMain />
        <Routes>
          <Route path='/' element={<ChatDispaly />} />
          <Route path='/login' element={<Login />} />
          <Route path='/rapidserve' element={<QuickService />} />
          <Route path='/peoplenearme' element={<NearMe />} />

        </Routes>
      </UserState>
    </>
  );
}

export default ColorSchemesExample;