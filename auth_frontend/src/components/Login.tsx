"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom"; // Use React Router
import axios from "axios";

// Define schema for login form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate(); // Use useNavigate from React Router

  const onSubmit = (data: any) => {
    console.log("Login Form Data", data.email, " ", data.password);
    // Handle login logic here
    axios.post('http://localhost:3000/login', {
      email: data.email,
      password: data.password,
    }, {
      withCredentials: true,
    }).then( (response) => {
      console.log(`login response = ${JSON.stringify(response)}...`)
      if (response.status === 200) {
        navigate('/');
      }
    }).catch ( (err) => {
      console.log(err);
      alert("Something went wrong...");
    })
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-700 text-white">
      <h2 className="text-3xl mb-6">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
            Login
          </Button>
        </form>
      </Form>
      {/* New User Redirect */}
      <p className="mt-4 text-sm">
        New here?{" "}
        <span
          className="text-indigo-400 cursor-pointer hover:underline"
          onClick={() => navigate("/signup")} // Use navigate for routing
        >
          Create an account
        </span>
      </p>
    </div>
  );
}
