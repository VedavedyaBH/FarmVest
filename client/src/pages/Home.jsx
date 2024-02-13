import { Title } from "../components/Titles";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

import img2 from "../assets/imageLan.png";

export function Home() {
  const { token, user } = useAuth();

  // useEffect(() => {}, [token, user]);

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white ">
        <div className="flex pt-2 justify-center">
          <div className="text-center justify-center">
            <div className="pt-10 pl-28">
              <img class="h-auto max-w-2xl " src={img2}></img>
            </div>
            <div className="text-center pt-6 text-4xl text-teal-700 font-extralight md:text-5xl lg:text-5xl ">
              Welcome to FarmVest
            </div>
            <div className="text-center pt-4 text-4xl text-gray-700 font-light  md:text-5xl lg:text-2xl ">
              India's only farm investing company
            </div>
            <div className="text-center pt-4 text-4xl text-gray-700 font-extralight md:text-5xl lg:text-3xl">
              Online platform to invest in all kinds of fruits, vegetables,
              crops, and more{" "}
            </div>
            {/* <Title
              label={
                "Online platform to invest in all kinds of fruits, vegetables, crops, and more"
              }
            ></Title> */}
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
