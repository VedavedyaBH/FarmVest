import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import { Wallet } from "./pages/Wallet";
import { Farms } from "./pages/Farms";
import { Orders } from "./pages/Orders";
import { FarmOperations } from "./pages/FarmOperations";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/addfarms" element={<FarmOperations />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
