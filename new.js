import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
function Cart() {
  const [cartProduct, setCartProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:443/api/cart/get?userId=${userId}`)
      .then((res) => {
        setCartProduct(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userId]);

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

  // Function to find product details by ID
  const findProductById = (productId) => {
    return allProducts.find((product) => product._id === productId);
  };

  // Function to handle item removal from the cart
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:443/api/cart/delete/${cartItemId}`);
      // Refresh the cart after deletion
      const updatedCart = cartProduct.filter((item) => item._id !== cartItemId);
      setCartProduct(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to handle adding items to the cart
  const decreaseFromCart = async (productId) => {
    const existingCartItem = cartProduct.find((item) => item.id === productId);

    if (existingCartItem) {
      // If the same product ID exists in the cart, decrease the quantity
      const updatedCart = cartProduct.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartProduct(updatedCart);
    } else {
      // If the product is unique, add a new item with quantity 1
      try {
        const response = await axios.post(
          "http://localhost:443/api/cart/post",
          {
            id: productId,
            quantity: 1, // Set the initial quantity to 1 for a new product
          }
        );
        setCartProduct([...cartProduct, response.data]);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Function to handle adding items to the cart
  const addToCart = async (productId) => {
    const existingCartItem = cartProduct.find((item) => item.id === productId);

    if (existingCartItem) {
      // If the same product ID exists in the cart, increase the quantity
      const updatedCart = cartProduct.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartProduct(updatedCart);
    } else {
      // If the product is unique, add a new item with quantity 1
      try {
        const response = await axios.post(
          "http://localhost:443/api/cart/post",
          {
            id: productId,
            quantity: 1, // Set the initial quantity to 1 for a new product
          }
        );
        setCartProduct([...cartProduct, response.data]);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Calculate total price
  const totalPrice = cartProduct.reduce((total, cartItem) => {
    const productDetails = findProductById(cartItem.id);
    return (
      total + (productDetails ? productDetails.price * cartItem.quantity : 0)
    );
  }, 0);

  return (
    <div className="max-w-7xl mt-24 mb-32 mx-auto p-4 bg-gray-100 rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartProduct.map((cartItem) => {
        // Find product details for each item in the cart
        const productDetails = findProductById(cartItem.id);

        if (!productDetails) {
          // Handle the case where product details are undefined
          return null;
        }

        return (
          <div
            key={cartItem._id}
            className="bg-white p-6 rounded mb-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4 h-6">
              <h2 className="text-xl font-semibold">{productDetails.name}</h2>
              <div className="flex items-center">
                <button
                  className="text-blue-500 text-5xl"
                  onClick={() => addToCart(cartItem.id)}
                >
                  +
                </button>
                <p className="mx-2 text-gray-600 text-3xl">
                  {cartItem.quantity}
                </p>
                <button
                  className="text-blue-500 text-5xl"
                  onClick={
                    cartItem.quantity <= 1
                      ? () => removeFromCart(cartItem._id)
                      : () => decreaseFromCart(cartItem.id)
                  }
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <span className="flex items-center">
                <img
                  src={`data:image/png;base64,${productDetails.image}`}
                  alt={productDetails.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <p className="text-gray-700">
                    Price: Rs. {productDetails.price}
                  </p>
                  <p className="text-gray-700">
                    Total: Rs. {productDetails.price * cartItem.quantity}
                  </p>
                </div>
              </span>
              <span className="mt-[50px]">
                <button
                  className="text-white px-3 rounded-md hover:bg-red-600 text-lg bg-red-500"
                  onClick={() => removeFromCart(cartItem._id)}
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        );
      })}
      {cartProduct.length > 0 && (
        <div className="flex items-center justify-between ml-4 mr-4">
          <span className="flex gap-3 items-center">
            <Link
              to={token ? "/checkout" : ""}
              className="rounded-md border-2 border-black px-3 py-2 text-lg font-bold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-blue-700 hover:text-white"
            >
              checkout
            </Link>
            <sup className="text-lg">{token ? "" : "*login to checkout"}</sup>
          </span>
          <p className="text-xl font-semibold">Total Price: Rs. {totalPrice}</p>
        </div>
      )}
      {cartProduct.length === 0 && (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;







//add to cart button

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const userId = cookies.get("USERID");


function AddToCartButton({ id }) {
  const [cart, setCart] = React.useState([]);
  // const [userId, setUserId] = useState("");

  // In AddToCartButton component
  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId && storedUserId !== userId) {
  //     setUserId(storedUserId);
  //   }
  // }, [userId]);

  useEffect(() => {
    const addToCart = async () => {
      if (!userId) {
        window.location.href = '/login'
        return;
      }

      if (cart.length === 0) {
        return;
      }

      try {
        await axios.post("http://localhost:443/api/cart/post", {
          id: cart[0],
          userId: userId,
        });
        toast.success("Product added successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.log(error);
      }
    };

    addToCart();
  }, [cart, userId]);

  return (
    <button
      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 transition duration-300"
      onClick={(e) => {
        e.preventDefault();
        setCart([id]);
      }}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
