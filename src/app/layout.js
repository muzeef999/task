"use client";
import "./globals.css";
import ButtonAppBar from "./compoents/Appbar";
import Providerf from "./Redux/Provide";
import store from "./Redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providerf store={store}>
          <ButtonAppBar />
          <ToastContainer />
          {children}
        </Providerf>
      </body>
    </html>
  );
}
