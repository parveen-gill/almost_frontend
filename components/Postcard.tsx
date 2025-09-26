"use client";
import React from "react";

interface PostCardProps {
  title: string;
  preview: string;
  city: string;
  time: string;
  slug:string;
}

const PostCard: React.FC<PostCardProps> = ({ title, preview, city, time }) => {
  return (
    <div className="bg-white rounded-xl  p-4 flex items-center justify-between">
      <h3 className="text-gray-800  font-medium text-sm mb-1">{title} ....</h3>
      <p className="text-gray-500 text-sm">
  {city} <span className="mx-1">•</span> {time}
</p>
    </div>
  );
};

export default PostCard;
