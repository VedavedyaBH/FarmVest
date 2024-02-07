import { useState, useEffect } from "react";
import { FarmsDisplay } from "../components/FarmDisplay";
import axios from "axios";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { Heading } from "../components/Heading";

export function Orders() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {}, [orders]);

  const genId = (itemId) => {
    const id = itemId * Math.random().toString();
    return id;
  };

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      console.log(user);

      const ordersData = await axios({
        method: "get",
        url: "http://localhost:3000/orders",
        headers: {
          Authorization: `Bearer ${token}`,
          userid: user,
        },
      });

      if (ordersData) {
        setOrders(ordersData.data.orders);
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Bad inputs");
      }

      if (error.response.status === 403) {
        alert("Something went wrong");
      }
    }
  };

  const sellOrder = async (itemid) => {
    try {
      const ordersData = await axios({
        method: "delete",
        url: `http://localhost:3000/orders/${itemid}`,

        headers: {
          Authorization: `Bearer ${token}`,
          userid: user,
        },
      });

      if (ordersData.status == 200) {
        alert("sold");
        fetchOrders();
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Bad inputs");
      }

      if (error.response.status === 403) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      {orders[0] == null ? (
        <>
          <div className="m-10">
            <Heading label={"You have not made any purchases"}></Heading>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="inline-grid grid-cols-5">
            {orders?.map((order) => (
              <div className="p-2" key={genId(order.itemId)}>
                <FarmsDisplay
                  title={order.itemname}
                  description={order.description}
                  img={`data:image/png;base64,${order.itemImage}`}
                  price={`Rs.${order.price}`}
                />
                <div className="pt-2">
                  <Button
                    label={"Sell"}
                    onClick={() => {
                      sellOrder(order.itemId);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
