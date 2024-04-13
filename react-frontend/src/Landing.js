import { useAuth } from "./context/AuthProvider";
import React, { useState, useEffect } from 'react';
import WebsiteAPI from "./WebsiteAPI";

export const Landing = () => {
  const { value } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const contacts = await WebsiteAPI.loadContacts(value.token);
        console.log(contacts);
        setUsers(contacts || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError("Something went wrong in fetching contacts.");
      }
    };
    fetchUsers();
  }, [value.token]);

  return (
    <div>
      <h1>Contacts List</h1>
      {error && <p>{error}</p>}
      {users.length === 0 && <p>No contacts found.</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
