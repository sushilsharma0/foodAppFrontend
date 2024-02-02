"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "message",
    ];
    const emptyFields = requiredFields.filter((field) => !eval(field.trim()));

    if (emptyFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${emptyFields.join(", ")}`,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      // Highlight empty fields when the form is submitted
      setIsFormSubmitted(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:443/api/message", {
        first_name,
        last_name,
        email,
        phone_number,
        message,
      });

      toast.success(`Message sent sucessfull wait for reply`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // Hide the success message after 3 seconds
      setTimeout(() => {
        window.location.href = "/contact";
      }, 2500);
    } catch (error) {
      toast.error(
        `${error.response.data.message} || "Failed to send message"`,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const isFieldEmpty = (field) => {
    return eval(field.trim()) === "" && isFormSubmitted;
  };

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col space-y-8 pb-10 pt-5 md:pt-10">
          <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              Share your thoughts
            </p>
          </div>
          <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
            Love to hear from you
          </p>
          <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            veritatis voluptates neque itaque repudiandae sint, explicabo
            assumenda quam ratione placeat?
          </p>
        </div>
        <div className="mx-auto max-w-7xl py-12 ">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            {/* contact from */}
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                  Get in touch
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  Our friendly team would love to hear from you.
                </p>
                <form className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className={`text-sm font-medium leading-none text-gray-700 ${
                          isFieldEmpty("first_name") ? "text-red-500" : ""
                        }`}
                        htmlFor="first_name"
                      >
                        First Name *
                      </label>
                      <input
                        className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                          isFieldEmpty("first_name") ? "border-red-500" : ""
                        }`}
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className={`text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                          isFieldEmpty("last_name") ? "text-red-500" : ""
                        }`}
                        htmlFor="last_name"
                      >
                        Last Name *
                      </label>
                      <input
                        className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                          isFieldEmpty("last_name") ? "border-red-500" : ""
                        }`}
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className={`text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        isFieldEmpty("email") ? "text-red-500" : ""
                      }`}
                      htmlFor="email"
                    >
                      Email *
                    </label>
                    <input
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                        isFieldEmpty("email") ? "border-red-500" : ""
                      }`}
                      type="text"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className={`text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        isFieldEmpty("phone_number") ? "text-red-500" : ""
                      }`}
                      htmlFor="phone_number"
                    >
                      Phone number *
                    </label>
                    <input
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                        isFieldEmpty("phone_number") ? "border-red-500" : ""
                      }`}
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      placeholder="Phone number"
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      onKeyDown={(e) => {
                        // Allow only numbers
                        if (!/\d/.test(e.key) && e.key !== "Backspace") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className={`text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        isFieldEmpty("message") ? "text-red-500" : ""
                      }`}
                      htmlFor="message"
                    >
                      Message *
                    </label>
                    <textarea
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                        isFieldEmpty("message") ? "border-red-500" : ""
                      }`}
                      id="message"
                      name="message"
                      placeholder="Leave us a message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={handleSubmit}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block h-[28.5rem]"
              src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
