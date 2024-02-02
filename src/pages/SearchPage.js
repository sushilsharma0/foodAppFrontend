import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SearchPage() {
  const { name } = useParams();
  const [foods, setFoods] = useState([]);
  const [searchedName, setSearchedName] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:443/api/foods")
      .then((res) => {
        setFoods(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const searchName = foods.filter((items) =>
      items.name.toLowerCase().includes(name.toLowerCase())
    );
    // console.log(searchName);
    setSearchedName(searchName);
  }, [name, foods]);

  return (
    <div className="mt-24">
      <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-8 text-blue-700">
        Searched results {`"${name}"`}{" "}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {searchedName.map((item) => (
          <div
            key={item._id}
            className="group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border-2 border-gray-200"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
          >
            <Link to={`/showProducts/${item._id}`}>
              <img
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                className="aspect-w-16 aspect-h-9 w-full object-cover h-[220px]"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {item.name}
              </h2>
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-900">Rs. {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
