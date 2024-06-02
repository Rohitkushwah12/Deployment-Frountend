import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserForm = ({ editUser, handleCancel }) => {
  const navigate = useNavigate();
  const [res, setRes] = useState();
  const [formData, setFormData] = useState({
    username: editUser ? editUser.username : "",
    name: editUser ? editUser.name : "",
    email: editUser ? editUser.email : "",
    password: editUser ? editUser.password : "",
    phone: editUser ? editUser.phone : "",
  });

  useEffect(() => {
    if (editUser) {
      setFormData({
        username: editUser.username,
        name: editUser.name,
        email: editUser.email,
        password: editUser.password,
        phone: editUser.phone,
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      if (editUser) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/users/${editUser._id}`,
          formData,
          config
        );
        handleCancel();
      } else {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users`,
          formData,
          config
        );
      }
      navigate("/users");
    } catch (error) {
      console.log(error);
      setRes(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">
                {editUser ? "Edit User" : "Add User"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  {editUser ? "Save" : "Submit"}
                </button>
                {editUser && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-block mt-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </form>
              {res && <div className="alert alert-danger mt-3">{res}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
