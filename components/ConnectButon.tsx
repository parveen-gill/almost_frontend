"use client";

import React, { useState } from "react";
import { HiOutlineLink } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";

interface ConnectButtonProps {
  receiverId: number;
  variant?: "post" | "comment"; // post or comment styling
  postId?: number;
  commentId?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ConnectButton: React.FC<ConnectButtonProps> = ({
  receiverId,
  variant = "post",
  postId,
  commentId,
}) => {
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleClick = async () => {
    if (!token) {
      toast.error("Please log in to send a connection request");
      return;
    }

    if (!receiverId) {
      toast.error("Receiver ID not found");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/connection/send-req`,
        {
          receiver_id: receiverId,
          source: variant,
          post_id: variant === "post" ? postId : null,
          comment_id: variant === "comment" ? commentId : null,
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("Connection request sent successfully");
      } else {
        toast.error(res.data.message || "Failed to send request");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "post") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center px-3 py-1 border bg-[#EDF6F9] border-[#003B4A] text-[#003B4A] rounded-full text-sm hover:bg-[#c7dde4] transition disabled:opacity-50"
      >
        <HiOutlineLink className="mr-1" /> Connect
      </button>
    );
  }

  // comment variant
  return (
    <span
      onClick={handleClick}
      className="cursor-pointer flex items-center text-red-500 gap-0.5 text-sm"
    >
      <HiOutlineLink /> Connect
    </span>
  );
};

export default ConnectButton;
