import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:443/api/foods")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const popularProduct = products.filter(
      (details) => details.tags && details.tags.includes("popular")
    );
    setPopularProducts(popularProduct);
  }, [products]);

  return (
    <div className="mb-32 mt-24">
      <p className="text-3xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-8 text-blue-700">
        popular foods{" "}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {popularProducts.map((item) => (
          <div
            key={item._id}
            className="group relative overflow-hidden bg-white rounded-lg border-2 border-gray-200"
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
            {hoveredProductId === item._id && (
              <div className="absolute top-[140px] flex flex-col gap-2 w-full p-4 bg-white/75 z-10">
                <p className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900">
                  Add to favorites
                </p>
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
              <div className="flex items-center space-x-2 mb-2">
                {[...Array(item.star)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="text-xs font-semibold text-gray-600">
                  {item.star} Reviews
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-900">Rs. {item.price}</p>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularProduct;
