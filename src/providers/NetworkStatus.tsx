import { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    setStatus(navigator.onLine);
    function changeStatus() {
      setStatus(navigator.onLine);
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);

  return status ? "Online" : "Offline";
};
export default NetworkStatus;
