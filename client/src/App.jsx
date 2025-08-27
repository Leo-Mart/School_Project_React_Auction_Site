import Router from "./components/Router.jsx";
import { AuctionsProvider } from "./context/AuctionsContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <UserProvider>
        <AuctionsProvider>
          <Router />
        </AuctionsProvider>
      </UserProvider>
      <ToastContainer position="bottom-center" />
    </>
  );
}
