import { Title } from "../components/Titles";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

import img2 from "../assets/lan.png";

export function Home() {
  const { token, user } = useAuth();
  useEffect(() => {
    navigate("/");
  }, [token, user]);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white ">
        <div className="flex pt-2">
          <div className="pt-14">
            <img class="h-auto max-w-xl border-2" src={img2}></img>
          </div>
          <div className="h-screen text-center pt-40  pl-28 pr-28">
            <div className="text-center pt-14 text-4xl text-gray-500 font-extralight md:text-5xl lg:text-5xl ">
              Welcome to FarmVest
              <div className="text-center pt-4 text-4xl text-gray-500 font-extralight md:text-5xl lg:text-2xl ">
                India's only farm investing company
              </div>
            </div>
            <Title
              label={
                "Online platform to invest in all kinds of fruits, vegetables, crops, and more"
              }
            ></Title>
            <div className="m-auto pt-4 w-24 h-24">
              {token ? (
                <>
                  <Button
                    label={"Invest"}
                    onClick={() => {
                      navigate("/farms");
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    label={"Log In"}
                    onClick={() => {
                      navigate("/login");
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
