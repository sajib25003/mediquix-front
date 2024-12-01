import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://mediquix-b9-a12-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;