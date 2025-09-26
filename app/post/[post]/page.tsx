'use client'
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import DetailedPostCard from "@/components/postDetail";

export default function PostPage() {
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
   const { post } = useParams();
  const [Detailpost, setDetailPost] = useState(null);

  useEffect(() => {
    if (!post) return;

    const fetchPost = async () => {
      const res = await axios.get(`${BASE_URL}/post/${post}`);
      console.log(res,"response")
      setDetailPost(res.data.data);  
    };

    fetchPost();
  }, [post]);

  if (!Detailpost) return <div>Loading...</div>;

  return <DetailedPostCard post={Detailpost} />;
}
