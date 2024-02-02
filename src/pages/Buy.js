import axios from "axios";
import React, { useEffect, useState } from "react";

function Buy() {
  const userId = localStorage.getItem("userId");
  const [info, setInfo] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

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
      .get("http://localhost:443/api/buyDetails/get")
      .then((res) => {
        setInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
  <div className="bg-white">
  {info.map((item)=> (
    <div key={item._id} className="mt-24">
      <p>{item._id}</p>
    </div>
  ))}
  </div>
  );
}

export default Buy;
