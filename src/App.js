// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthComponent from "./pages/AuthComponent";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Navbar } from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ShowProducts from "./pages/ShowProducts";
import Cart from "./pages/Cart";
import SearchPage from "./pages/SearchPage";
import UserProfile from "./pages/UserProfile";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import PopularProduct from "./pages/PopularProduct";
import AboutUs from "./pages/AboutUS";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import AllProduct from "./pages/AllProduct";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/PageNotFound";
import Buy from "./pages/Buy";
import VegFoods from "./pages/VegFoods";
import NonVegFoods from "./pages/NonVegFoods";
import NewFoods from "./pages/NewFoods";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/auth" element={<AuthComponent />} />
        </Route>
        <Route path="/showProducts/:id" element={<ShowProducts />} />
        <Route path="/all" element={<AllProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:name" element={<SearchPage />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/updateUserProfile/:id" element={<UpdateUserProfile />} />
        <Route path="/popularProducts" element={<PopularProduct />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/buyDetails" element={<Buy />} />
        <Route path="/vegFoods" element={<VegFoods />} />
        <Route path="/nonVegFoods" element={<NonVegFoods />} />
        <Route path="/new" element={<NewFoods />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
