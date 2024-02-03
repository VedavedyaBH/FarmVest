import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Title } from "../components/Titles";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export function Wallet() {
  const { token, user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [newAmount, setNewAmount] = useState();
  const [addMoney, setAddMoney] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  useEffect(() => {
    balance();
  }, [amount]);

  const balance = async () => {
    try {
      const amount = await axios({
        method: "get",
        url: "http://localhost:3000/wallet",
        headers: {
          Authorization: `Bearer ${token}`,
          userid: user,
        },
      });
      setAmount(JSON.stringify(amount.data.balance));
    } catch (error) {
      if (error.response.status == 400) {
        alert("Bad Inputs");
      }
      if (error.response.status == 403) {
        alert("No idea");
      }
    }
  };
  const addNewAmount = async () => {
    try {
      console.log(newAmount);

      const res = await axios({
        method: "post",
        url: "http://localhost:3000/wallet",
        data: {
          amount: newAmount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          userid: user,
        },
      });
      console.log(res);

      const bal = JSON.stringify(res.data.bal);
      setAmount(bal);
    } catch (error) {
      if (error.response.status == 400) {
        alert("Wrong inputs");
      }
      if (error.response.status == 403) {
        alert("Something wrong");
      }
    }
  };

  const withdrawNewAmount = async () => {
    try {
      console.log(newAmount);

      const res = await axios({
        method: "delete",
        url: "http://localhost:3000/wallet",
        data: {
          amount: newAmount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          userid: user,
        },
      });
      console.log(res);

      const bal = JSON.stringify(res.data.bal);
      setAmount(bal);
    } catch (error) {
      if (error.response.status == 400) {
        alert("Wrong inputs");
      }
      if (error.response.status == 403) {
        alert("Something wrong");
      }
    }
  };
  return (
    <>
      <div
        className={`bg-white flex justify-center p-5 ${
          !(addMoney || withdraw) ? "pt-36" : "pt-28"
        } `}
      >
        <div
          className={`p-6 border-2 shadow-sm ${
            !(addMoney || withdraw) ? "w-96 h-96" : "w-96"
          }`}
        >
          <div
            className={`flex flex-col justify-center ${
              !(addMoney || withdraw) ? "pt-12" : ""
            }`}
          >
            <Heading label={"Balance"}></Heading>
            <div className="text-center text-4xl font-semibold	pt-2 pb-4">{`Rs.${amount}`}</div>
            <Button
              label={`Add Money`}
              onClick={() => {
                if (addMoney || withdraw) {
                  setAddMoney(false);
                } else {
                  setAddMoney(true);
                }
              }}
            ></Button>
            <Button
              label={`Withdraw`}
              onClick={() => {
                if (addMoney || withdraw) {
                  setWithdraw(false);
                } else {
                  setWithdraw(true);
                }
              }}
            ></Button>
            {addMoney || withdraw ? (
              <>
                <div className="bg-white flex justify-center p-5 ">
                  <div className="p-6 border-2 shadow-sm">
                    <div className="flex flex-col justify-center">
                      <Heading label={"Enter Amount"}></Heading>
                      <InputBox
                        label={"Amount"}
                        placeholder={"Amount"}
                        onChange={(e) => {
                          setNewAmount(e.target.value);
                        }}
                      ></InputBox>

                      <div className="pt-4">
                        {withdraw ? (
                          <>
                            <Button
                              label={"Withdraw"}
                              onClick={withdrawNewAmount}
                            ></Button>
                          </>
                        ) : (
                          <>
                            <Button
                              label={"Add"}
                              onClick={addNewAmount}
                            ></Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
