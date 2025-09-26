"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import axios from "axios";
import DetailedPostCard from "@/components/postDetail";

const PostDetailPage = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(``);
        setPost(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading post...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <DetailedPostCard post={post} />
    </div>
  );
};

export default PostDetailPage;
