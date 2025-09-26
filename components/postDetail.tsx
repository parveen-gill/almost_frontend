"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { HiOutlineLink } from "react-icons/hi2";
import LoginModal from "./loginModal";
import CommentBox from "./CommentBox";
import CommentItem from "./commentItem";
import ConnectButon from "./ConnectButon";
import { useAuth } from "@/authcontext";
import ConnectButton from "./ConnectButon";
import { ToastContainer } from "react-toastify";
interface UserDetail {
  first_name?: string;
}

interface User {
  id: number;
  email?: string;
  User_detail?: UserDetail;
}

interface Comment {
  id: number;
  content: string;
  likes_count?: number;
  User?: User;
  parent_comment_id?: number | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  hashtag?: string;
  commentsCount?: number;
  User?: User;
  location?: string;
  timeAgo?: string;
  
}

interface DetailedPostCardProps {
  post: Post;
}

const DetailedPostCard: React.FC<DetailedPostCardProps> = ({ post }) => {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const {isLoggedIn}=useAuth();
useEffect(() => {
  if (!isLoggedIn) {
    setShowCommentBox(false); 
    setLiked(false);
  }
}, [isLoggedIn]);
  // Fetch likes and comments on mount
  useEffect(() => {

      const fetchLikes = async () => {
    try {
        const token = localStorage.getItem("token") || "";
     const res = await axios.get(`${BASE_URL}/post/get-likes/${post.id}`, {
  headers: { token },
});

      console.log("likes API response:", res.data);
      setLikesCount(res.data.likesCount);
      setLiked(res.data.userHasLiked);
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  };


    const fetchComments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post/get-comments/${post.id}`);
        setComments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchLikes();
    fetchComments();
  }, [post.id, BASE_URL]);

  const handleLike = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/post/like-post`,
        { post_id: post.id },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.message === "Post liked") {
        setLikesCount((prev) => prev + 1);
        setLiked(true);
      } else if (res.data.message === "Post unliked") {
        setLikesCount((prev) => Math.max(prev - 1, 0));
        setLiked(false);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    // Add the new comment to the list
    setComments((prev) => [...prev, newComment]);
  };

  const toggleCommentBox = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowCommentBox((prev) => !prev);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 max-w-3xl mx-auto mt-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
              {post.User?.User_detail?.first_name?.[0] || post.User?.email?.[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {post.User?.User_detail?.first_name || "User"}
              </p>
              <p className="text-xs text-red-400">
                {post.location} · {post.timeAgo}
              </p>
            </div>
          </div>

          {/* Connect Button */}
<ConnectButton 
  receiverId={post.User?.id!}  
  variant="post" 
  postId={post.id} 
/>


        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-cyan-900 mb-3 leading-snug">
          {post.title}
        </h2>

        {/* Content */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.content}</p>

        {/* Hashtag */}
        {post.hashtag && (
          <p className="text-sm font-semibold text-gray-700 mb-4">{post.hashtag}</p>
        )}

        <hr className="border-gray-200 my-4" />

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-6 items-center">
            {/* Like */}
            <div
              className="flex items-center space-x-2 cursor-pointer hover:text-red-500 transition"
              onClick={handleLike}
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
              <span>{likesCount}</span>
            </div>

            {/* Comments */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleCommentBox}
            >
              <LuMessageCircle />
              <span>{post.commentsCount || comments.length}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setShowLoginModal(true)}
              >
                Log In
              </span>
            )}
            <span className="cursor-pointer hover:underline">Report</span>
            <FaShareAlt className="cursor-pointer" />
            <FaBookmark className="cursor-pointer" />
          </div>
        </div>

        {/* Comment Box */}
{showCommentBox && (
  <div className="mt-4">
    {/* Top-level comment input */}
    <CommentBox
      postId={post.id}
      onCommentAdded={(newComment) => {
        // Add new comment to the top-level comments state
        handleCommentAdded(newComment);
      }}
    />

    {/* Render top-level comments */}
    <div className="mt-4 space-y-3">
  {comments.map((c) => (
    <div key={c.id} className="border-b border-gray-100 pb-3">
      <CommentItem comment={c} postId={post.id} />
    </div>
  ))}
</div>

  </div>
)}



      </div>
      <ToastContainer/>
      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default DetailedPostCard;
