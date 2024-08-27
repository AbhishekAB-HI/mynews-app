import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import profleimage from "../images/PERSONALPHOTO.jpg"; // Replace with the appropriate image
import {
  FaBell,
  FaEnvelope,
  FaHome,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import Navbar from "./Navbar";

const AdminHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "Abhishek",
      email: "abhishek@gmail.com",
      image: profleimage,
      status: "block",
    },
    // Add more users as needed...
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white p-4 h-screen fixed left-20 top-20">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <FaHome style={{ fontSize: "20px" }} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers style={{ fontSize: "20px" }} />
              <span>UserManagement</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserFriends style={{ fontSize: "20px" }} />
              <span>Article management</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope style={{ fontSize: "20px" }} />
              <span>Location Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBell style={{ fontSize: "20px" }} />
              <span>Report</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserFriends style={{ fontSize: "20px" }} />
              <span>UserReportManagement</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBell style={{ fontSize: "20px" }} />
              <span>Log out</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-4">
          <div className="container mx-auto">
            <h1
              className="text-3xl mb-6 text-center"
              style={{ fontFamily: "Viaoda Libre" }}
            >
              User management System
            </h1>

            {/* Search Bar */}
            <div className="flex justify-center mb-10">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type here..."
                className="bg-gray-800 text-white px-4 py-2 rounded-l-full w-1/3 outline-none"
              />
              <Button
                variant="contained"
                color="primary"
                className="rounded-r-full"
              >
                Search
              </Button>
            </div>

            {/* User Cards */}
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white text-black p-4 rounded-lg flex justify-between items-center max-w-4xl mx-auto"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color={user.status === "block" ? "secondary" : "primary"}
                  >
                    {user.status === "block" ? "Block" : "Unblock"}
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex space-x-2">
                <Button variant="text" color="primary" className="text-lg">
                  1
                </Button>
                <Button variant="text" color="primary" className="text-lg">
                  2
                </Button>
                <Button variant="text" color="primary" className="text-lg">
                  3
                </Button>
                <Button variant="text" color="primary" className="text-lg">
                  4
                </Button>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;
