import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddToCartButton from "../components/AddToCartButton";
import AddToFavButton from "../components/AddToFavButton";

function AllProduct() {
  const [allProducts, setAllProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  

  useEffect(() => {
    axios
      .get("http://localhost:443/api/foods")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mt-24 mb-32 bg-white">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {allProducts.map((item) => (
          <div
            key={item._id}
            className="group relative overflow-hidden bg-white rounded-lg border-2 border-gray-200"
            onMouseEnter={() => setHoveredProductId(item._id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            {item.tags && item.tags.includes("sales") && (
              <p className="absolute top-0 right-0 bg-blue-700 px-4 text-lg text-white rounded-md">
                Sale
              </p>
            )}

             {item.tags && item.tags.includes("new") && (
              <p className="absolute top-0 right-0 bg-blue-700 px-4 text-lg text-white rounded-md">
                new
              </p>
            )}

             {item.tags && item.tags.includes("veg") && (
              <p className="absolute top-0 right-0 bg-blue-700 px-4 text-lg text-white rounded-md">
                veg
              </p>
            )}

             {item.tags && item.tags.includes("non-veg") && (
              <p className="absolute top-0 right-0 bg-blue-700 px-4 text-lg text-white rounded-md">
                non-veg
              </p>
            )}

            <Link to={`/showProducts/${item._id}`}>
              <img
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                className="aspect-w-16 aspect-h-9 w-full object-cover h-[220px]"
              />
            </Link>
            {hoveredProductId === item._id && (
              <div className="absolute top-[140px] flex flex-col gap-2 w-full p-4 bg-white/75 z-10">
                <AddToFavButton id={item._id} />
                <p className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900">
                  <Link to={`/showProducts/${item._id}`}>View Details</Link>
                </p>
                {/* Add more options as needed */}
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {item.name}
              </h2>
              <div className="flex items-center space-x-2 mb-2"></div>
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-900">Rs. {item.price}</p>
                <AddToCartButton id={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProduct;
