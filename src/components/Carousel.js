import React from "react";
import img from "../img/bg1.jpg";
import { Link } from "react-router-dom";

function Carousel() {
  const [searchedName, setSearchedName] = React.useState("");

  const sectionStyle = {
    background: `url(${img})`,
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      window.location.href = `/search/${searchedName}`
    }
  };

  return (
    <section className="bg-white relative h-[63vh] mt-[4%]" style={sectionStyle}>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <Link
          to='/new'
          className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">See what's new</span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          we deliver the taste of life!! <br />
          get it deliver right to your door!!
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-800 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
        <div className="w-full max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              id="default-email"
              className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter food name here you want..."
              onKeyDown={handleKeyDown}
              value={searchedName}
              onChange={(e) => setSearchedName(e.target.value)}
            />
            <Link
            to={`/search/${searchedName}`}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search food
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  );
}

export default Carousel;
