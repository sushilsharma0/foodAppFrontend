import React, { useEffect, useState } from "react";
import { Bookmark, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "../css/navbar.css";
import logo from "../img/logo.png";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Auth",
    href: "/auth",
  },
  {
    name: "About Us",
    href: "/aboutUs",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchedName, setSearchedName] = React.useState("");
  const storedImageLink = localStorage.getItem("imageLink");
  const [cartProduct, setCartProduct] = useState([]);
  const storedUserId = localStorage.getItem("userId");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/login";
    // clear username from local storage
    localStorage.removeItem("imageLink");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:443/api/cart/get?userId=${storedUserId}`)
      .then((res) => {
        setCartProduct(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [cartProduct]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      window.location.href = `/search/${searchedName}`;
    }
  };

  return (
    <div className="fixed top-0 w-full bg-[#3d36c8] z-50">
      <div className="mx-auto h-[9.5vh] flex max-w-[90rem] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="h-12" />
            {/* <span className="font-bold text-2xl pr-2 text-white">foodApp</span> */}
          </Link>
          <div className="flex-grow hidden lg:flex justify-end pl-24">
            <input
              className="flex h-10 w-[180px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Search foods.."
              onKeyDown={handleKeyDown}
              value={searchedName}
              onChange={(e) => setSearchedName(e.target.value)}
            ></input>
            <Link to={`/search/${searchedName}`}>
              <Search className="self-center ml-2 cursor-pointer w-8 h-8 text-white" />
            </Link>
          </div>
          <span className="pl-10">
            {token ? (
              <Link
                to="/cart"
                className="flex gap-1 border-2 px-2 py-1 rounded-md"
              >
                <ShoppingCart
                  className="cursor-pointer text-white"
                  id="store"
                />
                <span className="text-white text-lg">
                  Cart({cartProduct.length})
                </span>
              </Link>
            ) : (
              <button className="flex gap-1 border-2 px-2 py-1 rounded-md">
                <ShoppingCart
                  className="cursor-pointer text-white"
                  id="store"
                />
                <span className="text-white text-lg">Cart</span>
              </button>
            )}
          </span>
          {
            token ? 
            <Link to='/bookmark'><Bookmark className="text-white" /></Link> : <Bookmark className="text-white" />
          }
        </div>
        <div className="hidden lg:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-lg font-bold text-white hover:text-gray-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <div className="dropdown text-lg font-bold text-white hover:text-gray-100">
                <span className="cursor-pointer">Category</span>
                <div className="dropdown-content rounded-lg">
                  <Link to="/all" className="dropdown-item w-32">
                    All Foods
                  </Link>
                  <div className="dropdown-item">
                    <Link to="/vegFoods">Veg foods</Link>
                  </div>
                  <div className="dropdown-item">
                    <Link to="/nonVegFoods">Non-Veg Foods</Link>
                  </div>
                  <div className="dropdown-item w-44">
                    <Link to="/popularProducts">Popular Foods</Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <span className="flex gap-8">
          {token ? (
            <Link to={`/user/${storedUserId}`}>
              <img
                src={`data:image/png;base64,${storedImageLink}`}
                className="h-12 rounded-[30%]"
              />
            </Link>
          ) : (
            ""
          )}

          <div className="hidden space-x-2 lg:block">
            {token ? (
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-md border-2 border-black px-3 py-2 text-lg font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-blue-950"
              >
                Logout
              </button>
            ) : (
              <div className="hidden space-x-2 lg:block">
                <Link
                  to="/login"
                  type="button"
                  className="rounded-md bg-transparent px-3 py-2 text-lg font-bold text-white hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  type="button"
                  className="rounded-md border border-white px-3 py-2 text-lg font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-black/10"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </span>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold">foodApp</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    <div className="dropdown text-lg font-bold text-black hover:text-gray-900">
                      <span className="cursor-pointer">Foods</span>
                      <div className="dropdown-content">
                        <Link to="/all" className="dropdown-item">
                          All Foods
                        </Link>
                        <div className="dropdown-item">Settings</div>
                        <div className="dropdown-item">Earnings</div>
                        <div className="dropdown-item">Sign out</div>
                      </div>
                    </div>
                  </nav>
                </div>
                {token ? (
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="w-full rounded-md bg-black mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="mt-2 space-y-2">
                    <Link to="/login">
                      <button
                        type="button"
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mb-4"
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link to="/register">
                      <button
                        type="button"
                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
