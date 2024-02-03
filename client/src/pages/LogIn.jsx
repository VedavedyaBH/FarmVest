import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function LogIn() {
  const { _login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Logged in");
        const token = response.data.token;
        _login({ email, token });
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Wrong credentials");
      }
      if (error.response && error.response.status === 400) {
        alert("Nothing received");
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-white flex justify-center p-5 pt-48 ">
        <div className="p-6 border-2 shadow-sm">
          <div className="flex flex-col justify-center">
            <Heading label={"LogIn"}></Heading>
            <InputBox
              label={"Email"}
              placeholder={"email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></InputBox>
            <InputBox
              label={"Password"}
              placeholder={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></InputBox>
            <div className="pt-4">
              <Button label={"Login"} onClick={login}></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
