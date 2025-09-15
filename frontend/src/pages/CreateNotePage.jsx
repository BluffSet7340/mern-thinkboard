import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
import axios from "axios";
import api from "../lib/axios";

const CreateNotePage = () => {
  const navigate = useNavigate() //use navigate hook
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title && content) {
      try {
        await api.post("/notes", {
          title,
          desc: content,
        });
        toast.success("Note created successfully!");
        // now navigate user to home page
        navigate("/") 

        // Replace with your API endpoint
        // const res = await fetch("http://localhost:5001/api/notes", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ title, desc: content }),
        // });
        // if (!res.ok) throw new Error("Failed to create note");
        // toast.success("Note created successfully!");
        setTitle("");
        setContent("");
      } catch (err) {
        toast.error("Failed to create note");
        console.log(err)
        if(err.response.status === 429){
          toast.error("Slow down, you're creating notes too fast", {
            duration: 4000,
            icon: "X"
          })
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        className="bg-base-100 shadow-lg rounded-lg p-8 w-full max-w-lg flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-primary mb-2">
          Create a New Note
        </h2>
        <div className="form-control">
          <label
            className="label font-semibold text-base-content"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="input input-bordered input-primary w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
        </div>
        <div className="form-control">
          <label
            className="label font-semibold text-base-content"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            className="textarea textarea-primary w-full min-h-[120px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
        <Link to="/" className="btn btn-outline w-full mt-2">
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default CreateNotePage;
