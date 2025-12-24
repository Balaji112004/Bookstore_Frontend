import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import { SearchContext } from "./context/SearchContext";

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const { search, setSearch } = useContext(SearchContext);

  const [fullBooks, setFullBooks] = useState([]);
  const [dropfun, setDropfun] = useState(false);

  // Fetch full books
  useEffect(() => {
    FullBooks();
  }, []);

  const FullBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/fullBooks");
      console.log(res.data);
      setFullBooks(res.data);
    } catch (e) {
      console.error("Error fetching category books:", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
  };

  const dropfunctions = () => {
    setDropfun((prev) => !prev); // toggle dropdown
  };

  return (
    <div>
      <div>
        <div className="lg:h-[70px] h-[77px] pt-2 lg:pt-0 bg-blue-400 grid grid-cols-12 w-full items-center">
          <div className="col-span-3 lg:col-span-2">
            <Link to="/home">
              <h1 className="text-lg lg:text-xl font-bold text-white ml-4">
                Bookify
              </h1>
            </Link>
          </div>
          {/* Search bar */}
          <div className="col-span-6 pl-5 lg:pl-0 lg:col-span-5 flex">
            <form className="w-full">
              <div className="relative w-full">
                <input
                  className="h-10 w-full lg:w-[80%] rounded-lg pl-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter the book"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bx bx-search absolute lg:right-[22%] right-[5%] top-1/2 -translate-y-1/2 text-gray-500"></i>
              </div>
            </form>
          </div>

          {/* Desktop Cart */}
          <div className="h-8 hidden lg:block">
            <Link
              to="/cart"
              className="p-2 px-4 bg-white rounded text-md text-black hover:bg-gray-100 transition duration-100"
            >
              <i className="bx bx-cart text-lg"></i>
              <span className="text-md"> Cart</span>
            </Link>
          </div>

          {/* Desktop Orders */}
          <div className="h-8 lg:col-span-2 hidden lg:block">
            <Link
              to="/order"
              className="p-2 px-4 bg-white rounded text-md hover:bg-gray-100 transition duration-100"
            >
              <i className="bx bxs-package text-lg"></i>
              <span className="m-2 text-md">Orders</span>
            </Link>
          </div>

          {/* Conditional Render based on login */}
          {user ? (
            <>
              {/* Desktop Greeting */}
              <div className="text-white text-md hidden lg:block">
                Hello, <span className="font-bold">{user.name}</span>
              </div>

              {/* Mobile User Icon */}
              <div className="col-span-2 pl-10 block lg:hidden relative">
                <i
                  className="bx bx-user text-2xl text-black bg-white p-[5px] rounded-xl"
                  onClick={dropfunctions}
                ></i>

                {/* Mobile Slide-in Menu */}
              {dropfun && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                  <div
                    className={`absolute top-0 right-0 h-full w-[70%] bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${
                      dropfun ? "translate-x-0" : "-translate-x-full"
                    }`}
                  >
                    {/* Header section */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-bold">Menu</h2>
                        <p className="text-md text-gray-600">Hello, {user?.name}</p>
                      </div>
                      <button
                        className="text-2xl font-bold"
                        onClick={() => setDropfun(false)}
                      >
                        ×
                      </button>
                    </div>

                    {/* Menu links */}
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to="/"
                          className="block text-black text-lg hover:text-blue-500"
                          onClick={() => setDropfun(false)}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cart"
                          className="block text-black text-lg hover:text-blue-500"
                          onClick={() => setDropfun(false)}
                        >
                          Cart
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/order"
                          className="block text-black text-lg hover:text-blue-500"
                          onClick={() => setDropfun(false)}
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropfun(false);
                          }}
                          className="block w-full text-left text-lg text-red-600 hover:text-red-800"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              </div>

              {/* Desktop Logout */}
              <div className="col-span-1">
                <button
                  onClick={handleLogout}
                  className="p-1 px-2 bg-white rounded text-md hidden lg:block"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="col-span-3 lg:col-span-2 relative">
              <Link to="/loginsignup">
                <button className="p-1 bg-white rounded lg:text-md absolute right-3 bottom-[-19px] flex items-center">
                  {/* Mobile view: show only icon */}
                  {/* <i className="bx bx-log-in text-xl block lg:hidden"></i> */}
                  <i className='bx bx-user-plus text-2xl px-2 block lg:hidden' ></i>

                  {/* Desktop view: show text */}
                  <span className="hidden lg:block">Login / Sign Up</span>
                </button>
              </Link>
            </div>

            
          )}
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Nav;
