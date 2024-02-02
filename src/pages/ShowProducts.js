import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import Cookies from "universal-cookie";
import RelatedProduct from "../components/RelatedProduct";
import AddToCartButton from "../components/AddToCartButton";
import AddToFavButton from "../components/AddToFavButton";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function ShowProducts() {
  const [product, setProduct] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { id } = useParams();

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
    const productDetails = product.filter((details) => details._id === id);
    setProductDetails(productDetails);
  }, [product, id]);

  useEffect(() => {
    axios
      .get(`http://localhost:443/api/comments?productId=${id}`)
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  React.useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const submitComment = async (productId) => {
    try {
      if (editingCommentId) {
        await axios.put(
          `http://localhost:443/api/comments/${editingCommentId}`,
          {
            comment: userComment,
          }
        );
        setEditingCommentId(null);
      } else {
        const response = await axios.post(
          `http://localhost:443/api/comments?productId=${id}`,
          {
            productId,
            comment: userComment,
            rating: 5,
            username: userName,
          }
        );

        const newComment = response.data;
        setCommentData([...commentData, newComment]);
      }

      setUserComment("");

      const updatedComments = await axios.get(
        `http://localhost:443/api/comments?productId=${id}`
      );
      setCommentData(updatedComments.data);
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:443/api/comments/${commentId}`);
      setCommentData(
        commentData.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const editComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setUserComment(commentText);
  };

  return (
    <main className="mb-16 mt-16">
      <section className="overflow-hidden mb-10">
        {productDetails.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-2 max-w-[65vw] pt-10 mx-auto"
          >
            <div className="flex flex-col gap-8 md:pr-10">
              <img
                src={`data:image/png;base64,${item.image}`}
                className="w-full rounded-lg"
                alt={item.name}
              />
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl pl-6">{item.name}</h1>
                </div>
                <h2 className="text-xl pl-6">category: {item.category}</h2>
                <h2 className="text-xl pl-6">{item.description}</h2>
                <p className="text-2xl pl-6">
                  RS: {item.price}{" "}
                  <sup className="pl-3 text-red-500">10% off</sup>{" "}
                </p>
                <AddToCartButton id={item._id} />
                <AddToFavButton id={item._id} />
              </div>
            </div>
            <div className="ml-0 md:ml-4">
              <h1 className="text-4xl mb-6">Comments</h1>

              <textarea
                type="text"
                placeholder="Write your comment"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="border border-black w-full pl-3 py-5 rounded-lg placeholder:text-lg placeholder:text-black mb-6"
              />

              {token ? (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <button
                    className="bg-blue-600 py-3 text-white text-2xl font-semibold bold rounded-lg hover:bg-blue-900 w-full md:w-56"
                    onClick={() => submitComment(item._id)}
                  >
                    {editingCommentId ? "Update" : "Submit"}
                  </button>
                  {editingCommentId && (
                    <button
                      className="bg-red-600 py-3 text-white text-2xl font-semibold bold rounded-lg hover:bg-red-900 w-full md:w-56 mt-4 md:mt-0"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ) : (
                <button className="bg-blue-600 py-3 text-white text-2xl font-semibold bold rounded-lg hover:bg-blue-900 w-full md:w-56">
                  Submit
                </button>
              )}

              <div className="h-1 bg-black my-10"></div>

              {commentData.map((details) => (
                <div key={details._id} className="mb-4">
                  <p className="text-gray-500">
                    {new Date(details.createdAt).toLocaleString()}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    {details.username}
                  </p>
                  <span className="flex justify-between">
                    <p className="text-gray-800">{details.comment}</p>
                    {token && details.username === userName && (
                      <div className="flex mt-2 space-x-4">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() =>
                            editComment(details._id, details.comment)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => deleteComment(details._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="h-1 bg-black w-full mt-10 mx-24"></div>
      </section>
      <RelatedProduct />
    </main>
  );
}

export default ShowProducts;
