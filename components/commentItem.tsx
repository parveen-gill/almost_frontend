import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentBox from "./CommentBox";
import ConnectButon from "./ConnectButon";
import { HiOutlineLink } from "react-icons/hi2";
import ConnectButton from "./ConnectButon";

dayjs.extend(relativeTime);

interface CommentItemProps {
  comment: any;
  postId: number;
  onReplyAdded?: (reply: any, parentId: number) => void;
}

interface CommentType {
  id: number;
  content: string;
  created_at: string;
  User?: {
    User_detail?: {
      first_name?: string;
    };
    email?: string;
  };
  Replies?: CommentType[];
  parent_comment_id?: number | null;
  likes_count?: number;
}
const avatarColors = ["#a1c4df", "#dfb1a1", "var(--color-teal-600)"];

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId, onReplyAdded }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState <CommentType[]>(comment.Replies || []);

  // Helper function to format relative time like Instagram
  const formatRelativeTime = (date: string) => {
    const now = dayjs();
    const created = dayjs(date);
    const diffMinutes = now.diff(created, "minute");
    const diffHours = now.diff(created, "hour");
    const diffDays = now.diff(created, "day");

    if (diffMinutes === 0) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  // Get initials
  const getInitials = () => {
    const name = comment.User?.User_detail?.first_name || comment.User?.email || "A";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  // Handler to add new reply
  const handleReplyAdded = (newReply: CommentType) => {
  setReplies((prev) => [...prev, newReply]); 
  setShowReplyBox(false);
  setShowReplies(true); 
};


  return (
    <div className="mb-3 ">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {getInitials()}
        </div>

        {/* Comment body */}
        <div className="flex-1">
          {/* Username + time row */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-1 text-sm font-semibold text-gray-800">
              <span>{comment.User?.User_detail?.first_name || comment.User?.email}</span>
              <span className="font-normal text-xs mt-1 text-gray-500">
                · {formatRelativeTime(comment.created_at)}
              </span>
            </div>
          </div>

          {/* Comment content */}
          <p className="text-sm mt-1">{comment.content}</p>

          {/* Reply / View replies / Connect row */}
          <div className="flex items-center space-x-3 mt-1 text-[11px] text-gray-500">
            <span className="cursor-pointer" onClick={() => setShowReplyBox(!showReplyBox)}>
              Reply
            </span>

            {replies && replies.length > 0 && (
              <span className="cursor-pointer" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Hide replies" : `View replies (${replies.length})`}
              </span>
            )}
            <ConnectButton 
  receiverId={comment.User?.id!} 
  variant="comment" 
  commentId={comment.id} 
/>


             
          </div>

          {/* Inline reply box */}
          {showReplyBox && (
            <div className="mt-2">
              <CommentBox
                postId={postId}
                parentCommentId={comment.id}
                onCommentAdded={handleReplyAdded}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {showReplies && replies && replies.length > 0 && (
        <div className="ml-12 mt-2 space-y-3">
          {replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onReplyAdded={handleReplyAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
