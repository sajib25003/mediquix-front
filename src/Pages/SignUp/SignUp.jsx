import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import regImg from "../../assets/register.jpg";
import { useContext, useState } from "react";
import PageCover from "../../Shared/PageCover/PageCover";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    const { name, email, password, photoURL } = data;

    // Create user in Firebase
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("User created in Firebase:", loggedUser);

        // Update user profile in Firebase
        updateUserProfile(name, photoURL)
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
              photoURL: photoURL,
            };

            // Add user to MongoDB database
            axiosPublic.post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  console.log("User added to the database");
                  reset();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "User already exists",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              })
              .catch((error) => {
                console.error("Error adding user to the database:", error);
                Swal.fire({
                  icon: "error",
                  title: "Failed to create user",
                  text: error.message,
                });
              });
          })
          .catch((error) => console.error("Error updating user profile:", error));
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to create user",
          text: error.message,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>MediQuix | Sign Up</title>
      </Helmet>
      <PageCover title={"Please Sign Up Here..."}></PageCover>
      <div className="flex justify-center items-center bg-white ">
        <img className=" hidden md:flex ml-36 md:w-1/3" src={regImg} alt="" />

        <div className=" flex-grow py-4  text-black ">
          <div className=" hero-content mx-auto flex-col space-y-2">
            <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-purple-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* Name Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-300 mt-1">This field is required</span>
                  )}
                </div>

                {/* Photo URL Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo URL"
                    className="input input-bordered w-full"
                    {...register("photoURL")}
                  />
                  {errors.photoURL && (
                    <span className="text-red-300 mt-1">This field is required</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-300 mt-1">This field is required</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={!showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="input input-bordered w-full"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-300 mt-1">This field is required</span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-300 mt-1">Password should be at least 6 characters</span>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <span className="text-red-300 mt-1">Password should be less than 20 characters</span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-300 mt-1">
                        Password must contain one Uppercase letter, one lowercase letter, one number and one special character
                      </span>
                    )}
                    <span
                      className="absolute text-blue-500 text-xl top-4 right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="form-control text-black mt-6">
                  <div className="flex gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("terms", { required: true })}
                    />
                    <label className="text-blue-500 font-semibold" htmlFor="terms">
                      Please Read and Accept our{" "}
                      <a className="text-orange-600" href="#">
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <span className="text-red-300 mb-2">Please accept our Terms & Condition</span>
                  )}

                  {/* Submit Button */}
                  <input
                    className="btn bg-emerald-900 border-white text-white font-bold w-full"
                    type="submit"
                    value="Register"
                  />
                </div>

                {/* Existing Account and Social Login */}
                <p className="text-blue-500">
                  Already have an account? Please{" "}
                  <Link to="/login" className="font-bold text-orange-600">
                    Login
                  </Link>
                </p>
                <div className="flex flex-row items-center gap-4">
                  <h5 className="hidden md:flex font-semibold text-lg text-black ">
                    Create your account with{" "}
                  </h5>
                  <SocialLogin></SocialLogin>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;