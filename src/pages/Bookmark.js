import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import AddToCartButtonInBookmark from "../components/AddToCartButtonInBookmark";

const cookie = new Cookies();
const token = cookie.get("TOKEN");

function Bookmark() {
  const userId = localStorage.getItem("userId");
  const [bookmarkedProduct, setBookmarkedProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:443/api/foods")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:443/api/bookmark/get?userId=${userId}`)
      .then((res) => {
        setBookmarkedProduct(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userId]);

  const findProductById = (productId) => {
    return allProducts.find((product) => product._id === productId);
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(
        `http://localhost:443/api/bookmark/delete/${cartItemId}`
      );
      const updatedCart = bookmarkedProduct.filter(
        (item) => item._id !== cartItemId
      );
      setBookmarkedProduct(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="mt-24 mb-32 container mx-auto">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-3xl font-bold mb-6 text-center">
        You have <span>{bookmarkedProduct.length} items in your Bookmark</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {bookmarkedProduct.map((cartItem) => {
          const productDetails = findProductById(cartItem.product_id);

          if (!productDetails) {
            return null;
          }

          return (
            <div
              key={cartItem._id}
              className="group relative overflow-hidden bg-white rounded-lg border-2 border-gray-200"
              onMouseEnter={() => setHoveredProductId(cartItem._id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <Link to={`/showProducts/${productDetails._id}`}>
                <img
                  src={`data:image/png;base64,${productDetails.image}`}
                  alt={productDetails.name}
                  className="aspect-w-16 aspect-h-9 w-full object-cover h-[220px] rounded-t-lg"
                />
              </Link>

              {hoveredProductId === cartItem._id && (
                <div className="absolute top-[128px] flex flex-col gap-2 w-full p-4 bg-white/75 z-10">
                  <p className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900">
                    <Link to={`/showProducts/${productDetails._id}`}>
                      View Details
                    </Link>
                  </p>
                  <AddToCartButtonInBookmark id={productDetails._id} />
                  {/* Add more options as needed */}
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {productDetails.name}
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  {productDetails.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg text-gray-900">
                    Rs. {productDetails.price}
                  </p>
                  <button
                    className="text-white px-3 rounded-md hover:bg-red-600 text-lg bg-red-500"
                    onClick={() => removeFromCart(cartItem._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
