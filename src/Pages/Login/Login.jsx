import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login-bg.jpg";
import { AuthContext } from "../../Providers/AuthProvider";
import PageCover from "../../Shared/PageCover/PageCover";
import Swal from "sweetalert2";
import SocialLogin from "../../SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        //   sweet alert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully logged in.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(
          () => navigate(location?.state ? location.state : "/"),
          1000
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="">
      <PageCover title={"Please Login..."}></PageCover>

      <Helmet>
        <title>MediQuix | Login</title>
      </Helmet>
      <div className=" flex justify-center items-center lg:px-32 mx-auto md:gap-5 ">
        <div className="hidden md:flex  md:items-center md:w-1/2">
          <img className="  " src={loginImg} alt="" />
        </div>

        <div className="w-full flex-1 mx-auto lg:w-2/5 pr-28 flex-grow py-4 md:py-10 ">
          <div className="flex justify-center w-full   items-center  md:mx-10 lg:mx-auto flex-col space-y-2 ml-3">
            <div className="card bg-emerald-50 shrink-0 w-full mx-auto ml-10  lg:ml-48  shadow-2xl  ">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text text-black font-semibold">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                    name="email"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-semibold">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={!showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="input input-bordered w-full"
                      name="password"
                      required
                    />
                    <span
                      className="absolute top-1/3 right-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye></FaEye>
                      ) : (
                        <FaEyeSlash></FaEyeSlash>
                      )}
                    </span>
                  </div>

                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt text-black font-semibold link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                {/* login button */}
                <div className="form-control mt-6">
                  <input
                    // disabled={loginDisabled}
                    className="btn border-white bg-black hover:scale-105 text-white font-bold w-full"
                    type="submit"
                    value="Login"
                  />
                </div>
                <p className=" text-base text-black font-semibold">
                  New here?{" "}
                  <Link to="/register" className=" font-bold text-blue-700">
                    Create an account.
                  </Link>
                </p>
              </form>
              <div className="flex flex-row  items-center gap-4 px-6 pb-4">
                <h5 className="hidden md:flex font-semibold text-lg text-black ">
                  Login with{" "}
                </h5>
                <SocialLogin></SocialLogin>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
