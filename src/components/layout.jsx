import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};


export default Layout;
