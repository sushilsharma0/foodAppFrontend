import axios from "axios";
import React, { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";

function TopFood() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

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
      (details) => details.tags && details.tags.includes("top")
    );
    setProduct(relatedProduct);
  }, [products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="text-gray-600 h-[35rem] body-font bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-16">
      <div className="container mx-auto flex px-8 pt-20 pb-12 md:flex-row flex-col items-center">
        {currentItems.map((item) => (
          <>
            <div
              key={item._id}
              className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center rounded-lg p-8 bg-white bg-opacity-80"
            >
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                {item.name}
              </h1>
              <h3 className="title-font sm:text-2xl text-3xl mb-4 font-medium text-gray-800">
                Category: {item.category}
              </h3>
              <p className="mb-8 text-gray-700 text-lg leading-relaxed">
                {item.description}
              </p>
              <p className="text-xl font-bold text-gray-900">
                Rs. {item.price}
              </p>
              <div className="flex justify-center mt-4">
                <AddToCartButton id={item._id} />
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded-lg shadow-md w-full h-full"
                alt={item.name}
                src={`data:image/png;base64,${item.image}`}
              />
            </div>
          </>
        ))}
      </div>
      <div className="flex justify-evenly pb-10 space-x-4">
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
    </section>
  );
}

export default TopFood;
