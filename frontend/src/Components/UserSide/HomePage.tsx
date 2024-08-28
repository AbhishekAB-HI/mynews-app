import React, { useEffect, useState } from "react";
import { IoEarthOutline } from "react-icons/io5";
import logo from "../images/logo.png";
import { Button } from "@mui/material";
import logoWeb from '../animations/Animation - 1724244656671.json'
import { Link } from "react-router-dom";
import profleimage from '../images/PERSONALPHOTO.jpg'
import profleimage2 from "../images/AJAY.jpg";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaEnvelope,
  FaHome,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";

const HomePage = () => {
const [searchTerm, setSearchTerm] = useState("");





  const posts = [
    {
      id: 1,
      user: "Abhishek",
      image:
        "https://img.onmanorama.com/content/dam/mm/en/kerala/top-news/images/2024/7/31/landslide-wayanad3.jpg.transform/576x300/image.jpg",
      text: "WAYANAD LANDSLIDES: BIRD-EYE VIEW OF DEVASTATION",
      likes: "101k",
      comments: "2.1k",
      shares: "10k",
      userImage: profleimage ,
    },
    {
      id: 2,
      user: "Ajay",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/ed03/live/107ec890-5e00-11ef-aa88-e1e8b52e1b59.jpg.webp",
      text: "SHE WANTED TO LIVE A GOOD LIFE",
      likes: "101k",
      comments: "2.1k",
      shares: "10k",
      userImage:  profleimage2 ,
    },
  ];

  

  return (
    <div>
      <nav className="bg-black text-white px-4 py-3 shadow-md fixed w-full top-0 left-0 ">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Lottie animationData={logoWeb} style={{ width: "20%" }} />
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: "Viaoda Libre" }}
            >
              Clear View
            </h1>
          </div>
          <form className="flex items-center space-x-2 mr-40">
            <input
              type="search"
              value={searchTerm}
              placeholder="Search"
              style={{ width: "300px" }}
              className="bg-gray-800 text-white px-4 py-2 mr-8 rounded-full outline-none"
            />
            <Button style={{ color: "white" }} variant="outlined">
              Search
            </Button>
          </form>
          <div
            className="flex items-center space-x-6 mr-10"
            style={{ fontSize: "18px" }}
          >
            <button className="hover:underline">
              <Link to="/login">LogIn</Link>
            </button>
            <span>|</span>
            <button className="hover:underline">
              <Link to="/register">SignUp</Link>
            </button>
          </div>
        </div>
      </nav>

      <div className=" bg-black text-white min-h-screen mt-20 ">
        {/* Sidebar */}
        <aside className="w-1/5 p-4 space-y-4 fixed left-20 h-screen overflow-y-auto">
          <div className="flex items-center space-x-2">
            <FaHome style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "20px" }}>Home</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "20px" }}>Message</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUserFriends style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "20px" }}>Followers</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUsers style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "20px" }}>Community</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBell style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "20px" }}>Notification</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-4/5 ml-auto p-4 ">
          {/* Tabs */}
          <div
            style={{ fontSize: "20px" }}
            className="flex w-4/5 ml-auto  space-x-10 mb-4   border-b border-gray-700 fixed top-20   bg-black z-40"
          >
            <button className="pb-2 border-b-2 border-blue-500">All</button>
            <button className="pb-2">Latest News</button>
            <button className="pb-2">Breaking News</button>
            <button className="pb-2">Education</button>
            <button className="pb-2">Sports</button>
          </div>

          {/* Posts */}
          <div className="mt-16">
            {posts.map((post) => (
              <div key={post.id} className="mb-4">
                <div className="flex space-x-4 items-center">
                  <img
                    src={post.userImage}
                    alt={post.user}
                    className="rounded-full w-10 h-10"
                  />
                  <span className="font-semibold">{post.user}</span>
                </div>
                <div className="mt-2">
                  <p className="mt-2 text-left text-lg py-5">{post.text}</p>
                  <img
                    src={post.image}
                    alt={post.text}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="flex space-x-4 mt-2 text-gray-400">
                  <span>{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                  <span>{post.shares} Shares</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
