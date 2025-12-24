import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // ---------------- Fetch Cart Items ----------------
  const fetchCartData = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cartDeleteByProduct/${productId}`);
      fetchCartData(user.id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (user && user.id) fetchCartData(user.id);
  }, [user]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.newPrice * item.quantity,
    0
  );

  // ---------------- Payment Handler ----------------
  const handlePayment = async () => {
    if (!user || !user.id) {
      alert("Please login to place an order");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setPlacingOrder(true);

    try {
      //   Place order in your DB first
      const orderRes = await axios.post(
        `http://localhost:8080/api/orders/place/${user.id}`
      );
      const order = orderRes.data;

      // Create Cashfree payment session for that order
      const paymentPayload = {
        orderAmount: totalAmount.toFixed(2),
        customerEmail: user.email || "customer@example.com",
        customerPhone: user.mobile || "0000000000",
        customerName: user.name || "Guest User",
      };

      const cfRes = await axios.post(
        `http://localhost:8080/api/orders/payment/${user.id}/${order.id}`,
        paymentPayload
      );

      console.log("Cashfree session response:", cfRes.data);

      const paymentSessionId =
        cfRes.data.paymentSessionId || cfRes.data.payment_session_id;
      const orderId = cfRes.data.orderId || cfRes.data.order_id;

      if (!paymentSessionId) {
        alert("Failed to create payment session. Check console for details.");
        console.error("Invalid Cashfree response:", cfRes.data);
        return;
      }

      //  Launch Cashfree Checkout
      const cashfree = new window.Cashfree({ mode: "sandbox" });
      cashfree.checkout({
        paymentSessionId: paymentSessionId,
        redirectTarget: "_top",
        redirectUrl: `http://localhost:5173/payment-success?orderId=${encodeURIComponent(
          orderId
        )}`,
      });
    } catch (err) {
      console.error("Error during payment:", err);
      alert(err.response?.data?.error || "Error initiating payment.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ---------------- Render UI ----------------
  if (loading)
    return <p className="text-center mt-10">Loading cart...</p>;
  if (cartItems.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between items-center border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹{item.newPrice}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="font-bold text-green-700 text-lg">
              ₹{item.newPrice * item.quantity}
            </p>
            <div onClick={() => deleteCartItem(item.productId)}>
              <i className="bx bx-trash text-red-500 text-3xl hover:bg-gray-100 p-2"></i>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <p className="text-xl font-bold">Total:</p>
        <p className="text-xl font-bold text-green-700">₹{totalAmount}</p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handlePayment}
          disabled={placingOrder}
          className={`px-6 py-2 rounded-lg text-white ${
            placingOrder ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {placingOrder ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
