import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import AddToFavButton from "./AddToFavButton";

function SalesProduct() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [randomNumber, setRandomNumber] = useState();
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
      (details) => details.tags && details.tags.includes("sales")
    );
    setProduct(relatedProduct);
  }, [products]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    let random = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    setRandomNumber(random);
  }, []);

  return (
    <div className="bg-white pb-24">
      <p className="text-2xl max-w-[67vw] mb-4 mx-auto md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-700">
        foods in sale{" "}
        <span className="text-red-500">({formatTime(timeRemaining)} left)</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {product.map((item) => (
          <div
          className="group relative overflow-hidden bg-white rounded-lg border-2 border-gray-200"
            key={item._id}
            onMouseEnter={() => setHoveredProductId(item._id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <p className="absolute top-0 right-0 bg-blue-700 px-4 text-lg text-white rounded-md">
              sale
            </p>
            <Link to={`/showProducts/${item._id}`}>
              <img
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                className="aspect-w-16 aspect-h-9 w-full object-cover h-[220px]"
              />
            </Link>

            {/* Additional options on hover */}
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
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-900">
                  Rs.{" "}
                  {item.price - Math.floor((randomNumber / 100) * item.price)}{" "}
                  <sup className="text-red-700 font-bold">-{randomNumber}%</sup>
                </p>
                <AddToCartButton id={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesProduct;
