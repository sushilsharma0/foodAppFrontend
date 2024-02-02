import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

function Checkout() {
  const userId = localStorage.getItem("userId");
  const [cartProduct, setCartProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [product_details, setProduct_details] = useState([]);
  const [full_name, setFull_name] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state_province, setState_province] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [success, setSuccess] = useState(false);
  const userName = localStorage.getItem("username");

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
      .get(`http://localhost:443/api/cart/get?userId=${userId}`)
      .then((res) => {
        setCartProduct(res.data);
        const cartProducts = res.data;

        // Extract product details from the cart and set the state
        const details = cartProducts.map((cartItem) => {
          const productDetails = findProductById(cartItem.product_id);
          return productDetails ? productDetails : null;
        });

        // Filter out any null values (in case findProductById didn't find a match)
        const filteredDetails = details.filter((detail) => detail !== null);
        setProduct_details(filteredDetails);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userId, allProducts]);

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

  // Calculate total price
  const totalPrice = cartProduct.reduce((total, cartItem) => {
    const productDetails = findProductById(cartItem.product_id);
    return (
      total + (productDetails ? productDetails.price * cartItem.quantity : 0)
    );
  }, 0);

  const buySubmit = async () => {
    try {
      await axios.post("http://localhost:443/api/buyDetails/post", {
        product_details,
        userId,
        userName,
        full_name,
        address,
        city,
        state_province,
        postal_code,
      });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      setSuccess(false);
    }
  };

  if (success) {
    window.location.href = `/buyDetails`;
  }

  return (
    <div className="mx-auto my-4 max-w-4xl md:mt-24 md:mb-32">
      <div className="overflow-hidden  rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form onSubmit={buySubmit} method="post">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Contact information
                        </h3>

                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                          >
                            Full Name *
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Enter your name"
                            id="name"
                            name="full_name"
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            required
                          ></input>
                        </div>
                      </div>
                      <hr className="my-8" />
                      {/* <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Payment details
                        </h3>

                        <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                          <div className="col-span-3 sm:col-span-4">
                            <label
                              htmlFor="cardNum"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Card number
                            </label>
                            <div className="mt-1">
                              <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                id="cardNum"
                              ></input>
                            </div>
                          </div>
                          <div className="col-span-2 sm:col-span-3">
                            <label
                              htmlFor="expiration-date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Expiration date (MM/YY)
                            </label>
                            <div className="mt-1">
                              <input
                                type="date"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="cvc"
                              className="block text-sm font-medium text-gray-700"
                            >
                              CVC
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="cvc"
                                id="cvc"
                                autoComplete="csc"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" /> */}
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Shipping address
                        </h3>

                        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address *
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                autoComplete="street-address"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City *
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                autoComplete="address-level2"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province *
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="region"
                                name="state_province"
                                autoComplete="address-level1"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                value={state_province}
                                onChange={(e) =>
                                  setState_province(e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code *
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="postal-code"
                                name="postal_code"
                                autoComplete="postal-code"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e) => setPostal_code(e.target.value)}
                                value={postal_code}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Billing information
                        </h3>

                        <div className="mt-6 flex items-center">
                          <input
                            id="same-as-shipping"
                            name="same-as-shipping"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div className="ml-2">
                            <label
                              htmlFor="same-as-shipping"
                              className="text-sm font-medium text-gray-900"
                            >
                              Same as shipping information
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button
                          type="submit"
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Make payment
                        </button>
                        {success ? window.location.href = '/buyDetails' : ""}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {cartProduct.map((product) => {
                  const productDetails = findProductById(product.product_id);

                  if (!productDetails) {
                    // Handle the case where product details are undefined
                    return null;
                  }

                  return (
                    <li
                      key={product._id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                            src={`data:image/png;base64,${productDetails.image}`}
                            alt={productDetails.name}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold">
                              {productDetails.name}
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              {productDetails.category}
                            </p>
                          </div>
                          <p className="mt-4 text-xs font-medium ">x 1</p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">
                          {productDetails.price}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product._id)}
                          className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          <span className="sr-only">Remove</span>
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <hr className="mt-6 border-gray-200" />
            <form action="#" className="mt-6">
              <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                <div className="flex-grow">
                  <input
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                </div>
                <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            </form>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center justify-between text-gray-600">
                <p className="text-sm font-medium">Sub total</p>
                <p className="text-sm font-medium">{totalPrice}</p>
              </li>
              <li className="flex items-center justify-between text-gray-900">
                <p className="text-sm font-medium ">Total</p>
                <p className="text-sm font-bold ">{totalPrice}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
