import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { Wallet } from "./pages/Wallet";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <Home />
              </AuthProvider>
            }
          />
          <Route
            path="/login"
            element={
              <AuthProvider>
                <LogIn />
              </AuthProvider>
            }
          />
          <Route
            path="/wallet"
            element={
              <AuthProvider>
                <Wallet />
              </AuthProvider>
            }
          />
          {/* <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
