"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SidebarFilters from "@/components/SidebarFilters";
import PostSection from "@/components/postsection";
import Pagination from "@/components/pagination";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CollectiveWall() {
  const [postsByLabel, setPostsByLabel] = useState<Record<string, any[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 8; 
  const fetchPosts = async (page = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/post/all-posts`, {
        params: { page, limit: postsPerPage },
      });

      if (res.data.success) {
        const allPosts = res.data.data;
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);

        const groupedPosts: Record<string, any[]> = {};

        allPosts.forEach((post: any) => {
          const created_at = new Date(post.created_at);
          const diffMs = now.getTime() - created_at.getTime();
          const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

          let label = "";
          if (created_at.toDateString() === now.toDateString()) {
            label = diffHours <= 1 ? "1h ago" : `${diffHours}h ago`;
          } else if (created_at.toDateString() === yesterday.toDateString()) {
            label = "Yesterday";
          } else if (diffDays < 7) {
            label = `${diffDays} days ago`;
          } else {
            label = created_at.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          }

          const postData = {
            id: post.id,
            title: post.title,
            preview: post.content ? post.content.slice(0, 50) + "..." : "",
            city: post.location,
            time: label,
            slug:post.slug,
          };

          if (!groupedPosts[label]) groupedPosts[label] = [];
          groupedPosts[label].push(postData);
        });

        // Sort labels
        const parseLabel = (l: string) => {
          if (l.endsWith("h ago")) return parseInt(l);
          if (l === "Yesterday") return 25;
          if (l.endsWith("days ago")) return 25 + parseInt(l);
          return 1000;
        };

        const sortedLabels = Object.keys(groupedPosts).sort(
          (a, b) => parseLabel(a) - parseLabel(b)
        );

        const sortedGroupedPosts: Record<string, any[]> = {};
        sortedLabels.forEach((label) => {
          sortedGroupedPosts[label] = groupedPosts[label];
        });

        setPostsByLabel(sortedGroupedPosts);
        setCurrentPage(res.data.pagination.currentPage);
        setTotalPages(res.data.pagination.totalPages);

        toast.success("Posts fetched successfully");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <div className="flex">
      <SidebarFilters />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">The Collective Wall</h1>
        <p className="text-gray-600 mb-6">
          Browse through missed connections, confessions, and fleeting encounters shared by others.
        </p>

        <button className="px-6 py-2 bg-[#EDF6F9] border border-teal-600 text-black rounded-full hover:bg-[#daf2fa] transition flex gap-2 mb-2">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path
              d="M16.7188 12.1875L18.75 14.2188L20.7812 12.1875L21.875 13.2812L18.75 16.4062L15.625 13.2812L16.7188 12.1875ZM16.7188 10.4687L18.75 8.4375L20.7812 10.4687L21.875 9.375L18.75 6.25L15.625 9.375L16.7188 10.4687ZM20.3125 3.125H3.125C2.26562 3.125 1.5625 3.82812 1.5625 4.6875V7.1875C1.5625 7.57812 1.71875 7.96875 2.03125 8.28125L7.8125 14.0625V20.3125C7.8125 21.1719 8.51562 21.875 9.375 21.875H12.5C13.3594 21.875 14.0625 21.1719 14.0625 20.3125V17.1875H12.5V20.3125H9.375V13.4375L8.90625 12.9688L3.125 7.1875V4.6875H20.3125V3.125Z"
              fill="#00A5AA"
            />
          </svg>
          Sort By
        </button>
       
        {Object.keys(postsByLabel).map((label) => (
          <PostSection key={label} dateLabel={label} posts={postsByLabel[label]} />
        ))}

        {/* Pagination Buttons */}
        <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
/>

      </main>
    </div>
  );
}
