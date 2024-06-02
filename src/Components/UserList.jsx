import axios from "axios";
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`,
          config
        );
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`,
        config
      );
      setUsers(users.filter((user) => user._id !== id)); // Update state to remove deleted user
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setEditForm(true);
    setEditUser(user);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">User List</h3>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm mr-2"
                  type="button"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editForm && <UserForm editUser={editUser} handleCancel={handleCancel} />}
    </div>
  );
};

export default UserList;
