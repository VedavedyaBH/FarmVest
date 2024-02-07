import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { BottomWarning } from "../components/BottomWarning";

export function SignUp() {
  const { _login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    if (rePassword != password) {
      alert("Password did not match");
    } else {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:3000/signup",
          headers: {
            username: username,
            email: email,
            password: password,
          },
        });

        if (response.status === 200) {
          alert("Signed Up");
          const token = response.data.token;
          _login({ email, token });
          navigate("/wallet");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("Use diff");
        }
        if (error.response && error.response.status === 400) {
          alert("Nothing received");
        } else {
          console.error("Error:", error);
        }
      }
    }
  };
  return (
    <>
      <div className="bg-white flex justify-center p-5 pt-32">
        <div className="p-6 border-2  w-72 h-124">
          <div className="flex flex-col justify-center">
            <Heading label={"Sign Up"}></Heading>
            <InputBox
              label={"Username"}
              placeholder={"username"}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></InputBox>
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
            <InputBox
              label={"Confirm Password"}
              placeholder={"password"}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            ></InputBox>
            <div className="pt-4">
              <Button label={"SignUp"} onClick={signup}></Button>
              <BottomWarning
                label={"Already an user? "}
                buttonText={"Login"}
                to={"/login"}
              ></BottomWarning>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
