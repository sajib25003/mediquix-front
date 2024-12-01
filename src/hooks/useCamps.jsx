import { useEffect, useState } from "react";

const useCamps = () => {
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mediquix-b9-a12-server.vercel.app/camps")
      .then((res) => res.json())
      .then((data) => {
        setCamps(data);
        setLoading(false);
    })
  }, []);
    return [camps, loading]
};

export default useCamps;