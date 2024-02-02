import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";

function NonVegFoods() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
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
    const relatedProduct = products.filter(
      (details) => details.tags && details.tags.includes("non-veg")
    );
    setProduct(relatedProduct);
  }, [products]);

  return (
    <div className="mt-28">
        <p className="text-3xl mt-3 md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-8 text-blue-700">
        Veg foods{" "}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {product.map((item) => (
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

export default NonVegFoods;
