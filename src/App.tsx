import { RouterProvider } from "react-router-dom";
import router from "./constants/routes";
import React, { useState } from "react";
import { reloadUser } from "./redux/user/thunks/fetchAllUsers";
function App() {
  const [load,setload]=useState(true)
  React.useEffect(() => {
    reloadUser().then(()=>{
      setload(false)
    })
  }, []);
  return load?"...loading":<RouterProvider router={router} />;
}

export default App;
