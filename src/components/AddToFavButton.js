import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function AddToFavButton({ id }) {
  const userId = localStorage.getItem("userId");

  const addToBookmark = async () => {
    try {
      if (!userId) {
        console.error("Invalid userId");
        return;
      }

      await axios.post("http://localhost:443/api/bookmark/post", {
        product_id: id,
        userId: userId,
      });

      alert("bookmarked successfully!!");
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <p
      className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900"
      onClick={(e) => {
        e.preventDefault();
        addToBookmark();
      }}
    >
      Add to favorites
    </p>
  ) : (
    <p
      className="border border-gray-600 text-center rounded-md font-semibold cursor-pointer hover:border-2 hover:border-gray-900"
      onClick={(e) => {
        e.preventDefault();
        alert("login");
      }}
    >
      Add to favorites
    </p>
  );
}

export default AddToFavButton;
