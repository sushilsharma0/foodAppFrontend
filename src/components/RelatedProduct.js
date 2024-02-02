import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import AddToFavButton from "./AddToFavButton";

function RelatedProduct() {
  const [product, setProduct] = useState([]);
  const [relatedProductDetails, setRelatedProductDetails] = useState([]);
  const { id } = useParams();
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:443/api/foods")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const productDetailsArray = product.filter((details) => details._id === id);
    if (productDetailsArray.length > 0) {
      const productDetails = productDetailsArray[0];
      const relatedProduct = product.filter(
        (details) => details.category === productDetails.category
      );
      //   console.log("related product", relatedProduct);
      setRelatedProductDetails(relatedProduct);
    }
  }, [product, id]);

  return (
    <div className="mb-36">
      <p className="text-4xl mb-5 mx-auto block w-[50vw]">Related Product</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[90rem] mx-auto">
        {relatedProductDetails.map((item) => (
          <div
            key={item._id}
            onMouseEnter={() => setHoveredProductId(item._id)}
            onMouseLeave={() => setHoveredProductId(null)}
            className="group relative overflow-hidden bg-white rounded-lg border-2 border-gray-200"
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
                <AddToFavButton id={item._id} />
                <p className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900">
                  <Link to={`/showProducts/${item._id}`}>View Details</Link>
                </p>
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
                <AddToCartButton id={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
