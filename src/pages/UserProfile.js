import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserProfile() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:443/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredUser = users.filter((details) => details._id === id);
    if (filteredUser.length > 0) {
      setUser(filteredUser);
    }
  }, [id, users]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white shadow-md rounded-md">
      {user.map((details) => (
        <div key={details._id}>
          <img
            src={`data:image/png;base64,${details.profileImage}`}
            alt={`Profile of ${details.username}`}
            className="w-80 h-80 mx-auto mb-4 rounded-[100px]"
          />
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">User Information</h2>
            <ul className="flex flex-col gap-5 text-2xl">

              <li>
                <strong>Name:</strong> {details.username}
              </li>
              <li>
                <strong>Phone Number:</strong> {details.phone_number}
              </li>
              <li>
                <strong>Email:</strong> {details.email}
              </li>
              <li>
                <strong>Account Created at:</strong>{" "}
                {new Date(details.createdAt).toLocaleString()}
              </li>
              <li>
                <strong>Account Updated at:</strong>{" "}
                {new Date(details.updatedAt).toLocaleString()}
              </li>
            </ul>
          </div>
          <div className="mt-5 flex gap-5">
            <Link to={`/updateUserProfile/${id}`} className="inline-flex items-center  w-full justify-center rounded-md bg-blue-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
              Update
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
