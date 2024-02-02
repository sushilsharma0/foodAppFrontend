import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateUserProfile() {
  const [prevUserDetails, setPrevUserDetails] = useState({});
  const [username, setUserName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setImage] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username || prevUserDetails.username);
      formData.append(
        "phone_number",
        phone_number || prevUserDetails.phone_number
      );
      formData.append("email", email || prevUserDetails.email);
      formData.append("profileImage", profileImage);

      const response = await axios.put(
        `http://localhost:443/api/users/update/${id}`,
        formData
      );

      // Check the response status and handle accordingly
      if (response.status === 200) {
        // alert("User updated successfully");
        setMessage("User updated successfully");
        // Redirect to the user profile or any other page after successful update
        setTimeout(() => {
          window.location.href = `/user/${id}`;
        }, 2000);
      } else {
        console.error("Update failed:", response.data.message);
        // alert("Error updating user");
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);

      // Log detailed information to the console
      if (error.response) {
        setMessage(error.response.message);
        console.log("Error Response Status:", error.response.status);
        console.log("Error Response Data:", error.response.data);
      }

      alert("Error updating user");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:443/api/users/${id}`)
      .then((res) => {
        setPrevUserDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <section className="mt-10">
      <div
        className={`transition-transform duration-300 ease-in-out fixed top-24 right-0 mt-4 ${
          message ? "translate-x-0" : "translate-x-full"
        } ${message === "" ? "opacity-0" : ""}`}
      >
        <div className="bg-red-500 text-white p-4 rounded shadow-md">
          <p>{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Update your information
          </h2>
          <form
            method="POST"
            className="mt-8"
            onSubmit={handleUpdateUser}
            encType="multipart/form-data"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="userName"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  User Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder={prevUserDetails.username}
                    id="userName"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  phone number{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder={prevUserDetails.phone_number}
                    id="phoneNumber"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="Email"
                    placeholder={prevUserDetails.email}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="image"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    profile Image{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    accept="image/*"
                    id="image"
                    name="profileImage"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  update <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UpdateUserProfile;
