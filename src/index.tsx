import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import globalTheme from "./themes/globalTheme.ts";
import { ThemeProvider } from "@mui/material";
// import SignIn from "./Pages/SignIn.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={globalTheme}>
      <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
