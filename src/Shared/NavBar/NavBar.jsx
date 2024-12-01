import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import defaultUserImage from "../../assets/default.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from '/no-bg-logo-a12.png';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: selectedUser = [] } = useQuery({
    queryKey: ["selectedUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  const navLinks = (
    <>
      <li>
        <NavLink className="hover:scale-110 font-semibold" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:scale-110 font-semibold" to="/availableCamps">
          Available Camps
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink className="hover:scale-110 font-semibold" to="/login">
            Join Us
          </NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="navbar wave-container shadow-2xl  text-white fixed z-30 pl-4 md:px-10 max-w-screen-2xl">
      <div className="navbar-start w-full flex ">
        <div className="dropdown dropdown-start">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-lg md:text-xl hover:rotate-90"
          >
            <GiHamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/">
          <div className="flex justify-start items-center gap-2">
            <img src={logo} alt="logo" className="h-12 w-12" />
          <h3 className=" uppercase hover:scale-110 font-bold text-lg md:text-xl lg:text-3xl">
            Medi<span className=" text-lime-400">Quix</span>
          </h3>
          </div>
        </Link>
      </div>
      <div className="navbar-end  lg:flex">
        <ul className="menu hidden lg:flex menu-horizontal px-1">{navLinks}</ul>
        {/* dropdown menu */}
        { user &&
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 md:w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user ? user?.photoURL : defaultUserImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
            >
              <li>
                <NavLink to={selectedUser?.role === 'Admin' ? '/dashboard/organizerProfile' : '/dashboard/participantProfile'} className=" font-semibold text-lg text-yellow-200">
                  {user?.displayName || "Anonymous"}
                </NavLink>
              </li>
              <li className="font-medium">
                <Link to={selectedUser.role === 'Admin' ? '/dashboard' : '/dashboard'}>Dashboard</Link>
              </li>
              <li onClick={handleLogOut} className=" font-medium">
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        }{" "}
      </div>
    </div>
  );
};

export default NavBar;
