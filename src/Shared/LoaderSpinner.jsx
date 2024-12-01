import { FidgetSpinner } from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <div className=" flex justify-center items-center min-h-screen">
        <FidgetSpinner
          visible={true}
          height="280"
          width="280"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      </div>
    );
};

export default LoaderSpinner;