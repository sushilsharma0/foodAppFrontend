import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function AddToCartButton({ id }) {
  const userId = localStorage.getItem("userId");

  const addToCart = async () => {
    try {
      if (!userId) {
        console.error("Invalid userId");
        return;
      }

      await axios.post("http://localhost:443/api/cart/post", {
        product_id: id,
        userId: userId,
      });

      // console.log("success");
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

  return token ? (
    <button
      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 transition duration-300"
      onClick={(e) => {
        e.preventDefault();
        addToCart();
      }}
    >
      Add to Cart
    </button>
  ) : (
    <button
      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 transition duration-300"
      onClick={(e) => {
        e.preventDefault();
        alert("login to add cart")
        // window.location.href = '/login'
      }}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
