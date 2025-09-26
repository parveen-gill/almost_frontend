"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/authcontext";


interface Requester {
  id: number;
  email?: string;
  User_detail?: {
    first_name?: string;
    last_name?: string;
  };
}

interface ConnectionRequest {
  id: number;
  requester_id: number;
  receiver_id: number;
  status: "pending" | "accepted" | "rejected";
  Requester: Requester;
  Receiver?: Requester;
}

interface ConnectedUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface Connection {
  id: number;
  status: "pending" | "accepted" | "rejected";
  connectedUser: ConnectedUser;
}


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Profile = () => {
      const { isLoggedIn } = useAuth(); 
 const [requests, setRequests] = useState<ConnectionRequest[]>([]);
const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch pending requests
  const fetchRequests = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/connection/get-req`, {
        headers: { token },
      });
      setRequests(res.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  // Fetch accepted connections
  const fetchConnections = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BASE_URL}/connection/my-connections`, {
        headers: { token },
      });
      setConnections(res.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch connections");
    }
  };

  // Accept / reject request
  const respondToRequest = async (
    connection_id: number,
    action: "accepted" | "rejected"
  ) => {
    if (!token) return;
    try {
      await axios.post(
        `${BASE_URL}/connection/respond-req`,
        { connection_id, action },
        { headers: { token, "Content-Type": "application/json" } }
      );
      toast.success(`Request ${action}`);
      setRequests((prev) => prev.filter((r) => r.id !== connection_id));
      if (action === "accepted") {
        fetchConnections(); // refresh connections
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to respond");
    }
  };

   useEffect(() => {
    if (isLoggedIn) {
      fetchRequests();
      fetchConnections();
    } else {
  
      setRequests([]);
      setConnections([]);
    }
  }, [isLoggedIn]);


  return (
    <div className="min-h-screen  py-10 px-4  bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/Frame 2.jpg')" }}>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Incoming requests */}
        <h1 className="text-3xl font-bold text-[#003B4A] mb-6 text-center">
          Incoming Connection Requests
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading requests...</p>
        )}
        {!loading && requests.length === 0 && (
          <p className="text-center text-gray-400">No pending requests</p>
        )}

        <ul className="space-y-4 mb-10">
          {requests.map((req) => (
            <li
              key={req.id}
              className="flex justify-between items-center p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition bg-[#EDF6F9]"
            >
              <div>
                <p className="font-semibold text-[#003B4A]">
                  {req.Requester.User_detail?.first_name || req.Requester.email}
                </p>
                <p className="text-gray-500 text-sm">Pending connection</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => respondToRequest(req.id, "accepted")}
                  className="px-4 py-2 cursor-pointer rounded-full bg-gradient-to-r from-[#a8cef8] to-[#88a2b6] text-white font-medium hover:opacity-90 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => respondToRequest(req.id, "rejected")}
                  className="px-4 py-2 cursor-pointer rounded-full bg-gradient-to-r from-[#dfb1a1] to-[#a04143] text-white font-medium hover:opacity-90 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* My connections */}
        <h2 className="text-2xl font-semibold text-[#003B4A] mb-4 text-center">
          My Connections
        </h2>

        {connections.length === 0 && (
          <p className="text-center text-gray-400">You have no connections yet</p>
        )}

    <ul className="space-y-4">
  {connections.map((conn) => {
    const otherUser = conn.connectedUser;

    return (
      <li
        key={conn.id}
        className="flex justify-between items-center p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition bg-white"
      >
        <div>
          <p className="font-semibold text-[#003B4A]">
            {otherUser?.first_name
              ? `${otherUser.first_name} ${otherUser.last_name || ""}`
              : otherUser?.email}
          </p>
       
        </div>
      </li>
    );
  })}
</ul>

      </div>
    </div>
  );
};

export default Profile;
