"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the type for the quote object
interface Quote {
  id: number;
  quote: string;
  author: string;
  email: string; // You can remove this if you don't use it in the UI
  createdAt: string;
  updatedAt: string;
}

export function QuotesPage() {
  // Initialize quotes as an empty array of Quote objects
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/quotes", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(`response: ${JSON.stringify(response.data)}`);
        setQuotes(response.data); // Set the fetched quotes here
        
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
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
        {quotes.map((quoteObj, index) => (
          <div
            key={index}
            className="bg-zinc-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <p className="text-lg italic">“{quoteObj.quote}”</p> {/* Access the quote text */}
            <p className="mt-4 text-right font-semibold">- {quoteObj.author}</p> {/* Access the author */}
          </div>
        ))}
      </div>

      <button
        onClick={handleHomeRedirect}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Go to Home
      </button>

      <button
        onClick={handleQuotesFormRedirect}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Add a Quote
      </button>
    </div>
  );
}
