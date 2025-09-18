"use client";
import React, { useState } from "react";
import PostCard from "./Postcard";
import { FiChevronDown } from "react-icons/fi";

interface Post {
  id: number;
  title: string;
  preview: string;
  city: string;
  time: string;
}

interface PostSectionProps {
  dateLabel: string;
  posts: Post[];
}

const PostSection: React.FC<PostSectionProps> = ({ dateLabel, posts }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2 mt-1 rounded-xl p-4">
      {/* Header with toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-gray-600 font-semibold text-base mb-3"
      >
        {dateLabel}
        <FiChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Posts */}
      {open && (
        <div className="shadow-lg mt-2 bg-white p-4 rounded-lg">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostSection;
