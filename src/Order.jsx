import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";

function Order() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/orders/${userId}`);
      console.log("Orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchOrders(user.id);
    }
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (!orders || orders.length === 0)
    return <p className="text-center mt-10 text-lg">You have no orders yet.</p>;

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders.slice().reverse().map((order) => (
        <div
          key={order.id}
          className="border rounded-lg mb-8 p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-3">
            {/* <h2 className="text-xl font-semibold">Order #{order.id}</h2> */}
            <span
              className={`px-3 py-1 text-sm rounded ${
                order.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">
            <strong className="text-lg lg:text-xl">Total:</strong> 
            <span className="text-lg lg:text-xl text-green-700 font-bold">₹{order.totalAmount.toFixed(2)}</span>
          </p>
          <p className="text-gray-500 text-sm mb-4">
            <strong>Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
          </div>

          {/*Display products ordered */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.coverImage}
                    alt={item.product?.title}
                    className="lg:w-16 w-20 h-24 lg:h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.product?.title}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-green-700">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
