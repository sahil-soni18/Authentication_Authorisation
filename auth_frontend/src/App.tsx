// src/App.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    axios
      .get("http://localhost:3000", { withCredentials: true })
      .then((response) => {
        console.log(`response (Home Page) = ${JSON.stringify(response)}...`);
        if (response.status === 200 && response.data.loggedIn) {
          console.log("User is logged in...");
          setIsLoggedIn(true); // Set login state to true
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false); // Set login state to false in case of error
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true }) // Include credentials
      .then((response) => {
        console.log(response.data); // Handle successful logout
        // Redirect to login
        window.location.href = "/login"; 
      })
      .catch((error) => {
        console.error("Logout failed:", error); // Handle logout error
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-700 overflow-hidden">
      <div className="absolute top-4 flex space-x-6">
	<Link to="/quotes">
                <button className="px-6 py-2 m-2 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-200">
                    Quotes
                </button>
            </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 m-2 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-6 py-2 m-2 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition duration-200">
              Login
            </button>
          </Link>
        )}
      </div>
      {/* Your quote content */}
      <div className="text-center text-white px-8">
        <p className="text-2xl md:text-4xl font-semibold leading-relaxed">
          "Reading quotes is like gathering little sparks of wisdom from the
          greatest minds. Each quote holds the power to inspire, challenge,
          and uplift, offering a moment of reflection that can fuel a lifetime
          of growth."
        </p>
      </div>
    </div>
  );
};

export default App;
