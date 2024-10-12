import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the schema for form validation using Zod
const quoteSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters long').max(500, 'Quote cannot be longer than 500 characters'),
  author: z.string().min(2, 'Author must be at least 2 characters long').max(100, 'Author name cannot be longer than 100 characters'),
});

interface QuoteFormValues {
  quote: string;
  author: string;
}

export const AddQuoteForm: React.FC = () => {
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const navigate = useNavigate(); // Use useNavigate from React Router
  const onSubmit = (data: QuoteFormValues) => {
    // Handle form submission logic
    console.log(data);
    axios.post("http://localhost:3000/addQuote", data, {
      withCredentials: true,
    }).then(response => {
      if(response.status === 201) {
        alert("Quote Added.");
        navigate("/quotes");
      } 
    }).catch(err => {
      console.log(err);
      alert("Internal Server Error...");
    })
    // Here you would send the data to your backend using something like axios or fetch
    // Example: axios.post('/api/quotes', data)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Quote field */}
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Quote</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the quote..."
                    {...field}
                    className="w-full p-2 bg-zinc-600 text-white rounded-md"
                  />
                </FormControl>
                <FormMessage className="text-red-400 mt-1" />
              </FormItem>
            )}
          />

          {/* Author field */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Author name..."
                    {...field}
                    className="w-full p-2 bg-zinc-600 text-white rounded-md"
                  />
                </FormControl>
                <FormMessage className="text-red-400 mt-1" />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Quote
          </Button>
        </form>
      </Form>
    </div>
  );
};



// QuotoPedia