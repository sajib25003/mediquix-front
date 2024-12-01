import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('signup');
  const noFooter = location.pathname.includes('/dashboard');

  return (
    <div className="flex flex-col min-h-screen max-w-screen-2xl mx-auto">
      {noHeaderFooter || <NavBar />}
      
      <div className="flex ">
        <Outlet />
      </div>

      {noHeaderFooter || noFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;