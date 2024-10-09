"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// const quotes = [
//   {
//     text: "Reading quotes is like gathering little sparks of wisdom from the greatest minds. Each quote holds the power to inspire, challenge, and uplift, offering a moment of reflection that can fuel a lifetime of growth.",
//     author: "Unknown",
//   },
//   {
//     text: "The only limit to our realization of tomorrow will be our doubts of today.",
//     author: "Franklin D. Roosevelt",
//   },
//   {
//     text: "The future belongs to those who believe in the beauty of their dreams.",
//     author: "Eleanor Roosevelt",
//   },
//   {
//     text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
//     author: "Albert Schweitzer",
//   },
//   {
//     text: "You miss 100% of the shots you don’t take.",
//     author: "Wayne Gretzky",
//   },
//   {
//     text: "Act as if what you do makes a difference. It does.",
//     author: "William James",
//   },
// ];

export function QuotesPage() {
  const [quotes, setQuotes] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/quotes", {
        withCredentials: true 
      })
      .then((response) => {
        console.log(`response: ${JSON.stringify(response)}`);
        setQuotes(response.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Navigate to login if unauthorized
          navigate("/login");
        } else {
          console.error(err);
          setQuotes([]); // Set an empty array if another error occurs
        }
      });
  }, [navigate]);


  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to home
  };

  const handleQuotesFormRedirect = () => {
    navigate("/add-quote"); // Redirect to QuotesForm page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-800 p-6 text-white">
      <h1 className="text-4xl mb-8">Quotes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-zinc-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <p className="text-lg italic">“{quote}”</p>
            <p className="mt-4 text-right font-semibold">- {quote}</p>
          </div>
        ))}
      </div>

      {/* Button to go to home */}
      <button
        onClick={handleHomeRedirect}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Go to Home
      </button>

      {/* Button to go to the QuotesForm */}
      <button
        onClick={handleQuotesFormRedirect}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Add a Quote
      </button>
    </div>
  );
}
