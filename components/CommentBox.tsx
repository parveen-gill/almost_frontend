"use client";

import React, { useState } from "react";
import axios from "axios";

interface CommentBoxProps {
  postId: number;
  parentCommentId?: number | null;
  onCommentAdded: (newComment: any) => void;
}

const currentUser = 
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

// Avatar initials
const getInitials = () => {
  const name = currentUser?.User_detail?.first_name || currentUser?.email || "A";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
const CommentBox: React.FC<CommentBoxProps> = ({ postId, parentCommentId = null, onCommentAdded }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      const endpoint = parentCommentId ? `${BASE_URL}/post/reply-comment` : `${BASE_URL}/post/comment`;
      const payload: any = { post_id: postId, content };
      if (parentCommentId) payload.parent_comment_id = parentCommentId;

      const res = await axios.post(endpoint, payload, {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });

      if (res.data?.data) {
        onCommentAdded(res.data.data);
        setContent("");
      }
    } catch (err) {
      console.error("Error adding comment/reply:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex items-start space-x-2 bg-[#F9FAFB] border border-gray-200 rounded-xl p-3 shadow-sm"
    >
   {/* User Avatar Placeholder */}
<div
  className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white"

>
    {getInitials()}
</div>


      {/* Textarea */}
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={parentCommentId ? "Write a reply..." : "Write your comment..."}
          className="w-full resize-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-700 focus:outline-none px-3 py-2 text-sm text-gray-800 bg-white"
          rows={2}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1.5 bg-[#003B4A] text-white text-sm rounded-full shadow hover:bg-[#005265] transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
