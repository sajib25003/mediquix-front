import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        toast.success("Logged In Successfully!");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/"), 1000;
        });
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL : result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          setTimeout(() => {
            navigate(location?.state ? location.state : "/"), 1000;
          });
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline text-base md:text-xl  text-black font-semibold"
    >
      <FcGoogle /> Google
    </button>
    <ToastContainer />
    </>
  );
};

export default SocialLogin;
