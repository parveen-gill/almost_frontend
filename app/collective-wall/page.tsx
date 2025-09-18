import SidebarFilters from "@/components/SidebarFilters";;
import PostSection from "@/components/postsection";

export default function CollectiveWall() {
  const postsToday = [
    { id: 1, title: "Coffee Shop Glance..." ,city: "Mumbai", time: "2 hrs ago" },
     { id : 2,title:"I saw u at Gen Cafe...", city: "Chandigarh", time: "2 hrs ago" },
    { id: 3, title: "My neighbourhood friend...", preview: "We shared a brief glance...", city: "Delhi", time: "3 hrs ago" },
       { id: 4, title: "We shared a brief glance...", city: "Delhi", time: "3 hrs ago" },
    
  ];

  const postsYesterday = [
    { id: 3, title: "Coffee Shop Glance...", preview: "I saw u at Gen Cafe...", city: "Chandigarh", time: "1 day ago" },
  ];
  const postsSept15 = [
    { id: 4, title: "My neighbourhood friend...", preview: "I saw my friend when I was kid...", city: "Chandigarh", time: "2 days ago" },
    { id: 5, title: "Coffee Shop Glance...", preview: "We shared a brief glance...", city: "Delhi", time: "2 days ago" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarFilters/>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">The Collective Wall</h1>
        <p className="text-gray-600 mb-6">
          Browse through missed connections, confessions, and fleeting encounters shared by others.
        </p>

      <button
        className="px-6 py-2 bg-[#EDF6F9] border border-teal-600 text-black rounded-full hover:bg-[#daf2fa] transition flex gap-2 mb-2"
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7188 12.1875L18.75 14.2188L20.7812 12.1875L21.875 13.2812L18.75 16.4062L15.625 13.2812L16.7188 12.1875ZM16.7188 10.4687L18.75 8.4375L20.7812 10.4687L21.875 9.375L18.75 6.25L15.625 9.375L16.7188 10.4687ZM20.3125 3.125H3.125C2.26562 3.125 1.5625 3.82812 1.5625 4.6875V7.1875C1.5625 7.57812 1.71875 7.96875 2.03125 8.28125L7.8125 14.0625V20.3125C7.8125 21.1719 8.51562 21.875 9.375 21.875H12.5C13.3594 21.875 14.0625 21.1719 14.0625 20.3125V17.1875H12.5V20.3125H9.375V13.4375L8.90625 12.9688L3.125 7.1875V4.6875H20.3125V3.125Z" fill="#00A5AA"/>
</svg>Sort By
      </button>   

        {/* Sections */}
        <PostSection dateLabel="Today" posts={postsToday} />
        <PostSection dateLabel="Yesterday" posts={postsYesterday} />
        <PostSection dateLabel="15 September 2025" posts={postsSept15} />
      </main>
    </div>
  );
}
