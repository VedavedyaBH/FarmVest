import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FarmsDisplay } from "../components/FarmDisplay";
import axios from "axios";
import { Button } from "../components/Button";

export function Farms() {
  const { user, token } = useAuth();
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const farmData = await axios({
        method: "get",
        url: "http://localhost:3000/farms",
      });

      console.log(farmData.data.farms);
      if (farmData) {
        setFarms(farmData.data.farms);
      }

      console.log(farms);
    } catch (error) {
      if (error.response.status == 400) {
        alert("Bad inputs");
      }

      if (error.response.status == 403) {
        alert("Somthin went wrong");
      }
    }
  };

  const buyItem = async (itemid) => {
    try {
      console.log(itemid);
      const item = await axios({
        method: "post",
        url: "http://localhost:3000/orders",
        data: {
          itemid: itemid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          userid: user,
        },
      });

      if (item.status == 200) {
        fetchFarms();
        alert("Ordered");
      }
    } catch (error) {
      if (error.status === 400) {
        alert("Bad inputs");
      }

      if (error.status === 403) {
        alert("Something went wrong");
      }
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex p-10">
        {farms.map((farm) => (
          <div className="p-5">
            <FarmsDisplay
              title={farm.itemname}
              description={farm.description}
              img={`data:image/png;base64,${farm.itemImage}`}
              price={`Rs.${farm.price}`}
            ></FarmsDisplay>
            <div className="pt-2">
              <Button
                label={"Invest"}
                onClick={() => {
                  buyItem(farm.itemId);
                }}
              ></Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
