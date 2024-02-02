import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import AddToFavButton from "./AddToFavButton";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:443/api/foods", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 py-16">
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
      <p className="text-2xl max-w-[67vw] mb-4 mx-auto md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-700">
        Explore Top Sellers{" "}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {currentItems.map((item,index) => (
          <div
            key={item._id}
            className={`group relative overflow-hidden rounded-lg border-2 border-gray-200 ${
              index % 2 === 0 ? "bg-gray-300" : "bg-white"
            }`}
            onMouseEnter={() => setHoveredProductId(item._id)}
            onMouseLeave={() => setHoveredProductId(null)}
            
          >
            <Link to={`/showProducts/${item._id}`}>
              <img
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                className="aspect-w-16 aspect-h-9 w-full object-cover h-[220px]"
              />
            </Link>

            {/* Additional options on hover */}
            {hoveredProductId === item._id && (
              <div
               className="absolute top-[128px] flex flex-col gap-2 w-full p-4 bg-white/75 z-10">
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
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-900">Rs. {item.price}</p>
                <AddToCartButton id={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly mt-12 space-x-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= products.length}
          className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
