import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/authContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "usersprofesional"),
      where("nombre", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      const foundUsers = [];

      querySnapshot.forEach((doc) => {
        foundUsers.push(doc.data());
      });

      setUsers(foundUsers);
      setErr(false); // Reset the error state
    } catch (err) {
      setUsers([]); // Clear the users array in case of an error
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async (selectedUser) => {
    // Your code to handle user selection goes here
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User no encontrado!</span>}
      {users.map((user) => (
        <div className="userChat" key={user.uid} onClick={() => handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.nombre}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
