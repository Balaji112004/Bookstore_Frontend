import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header'
import Nav from "./Nav";
import LoginSignup from './LoginSignup';
import Cart from "./Cart";
import Order from "./Order";
import Home from "./Home";
import PaymentSuccess from './PaymentSuccess';
import PaymentFailure from './PaymentFailure';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Nav */}
        <Route path="/" element={<Nav />}>
          {/* Index route */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="loginsignup" element={<LoginSignup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-failure" element={<PaymentFailure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
