import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function AddToCartButtonInBookmark({ id }) {
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
    <p
      className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900"
      onClick={(e) => {
        e.preventDefault();
        addToCart();
      }}
    >
      Add to Cart
    </p>
  ) : (
    <p
      className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900"
      onClick={(e) => {
        e.preventDefault();
        alert("login");
      }}
    >
      Add to Cart
    </p>
  );
}

export default AddToCartButtonInBookmark;
