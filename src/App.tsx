import React from "react";
import ProfileSidebar from "./components/Profile/ProfileSidebar";
import ProjectGrid from "./components/Projects/ProjectGrid";

const App: React.FC = () => {
  return (
    <div
      className="h-screen lg:p-[0.8rem] flex flex-col font-sans select-none bg-fixed"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex relative h-full justify-between gap-x-3">
        {/* Left Sidebar Container */}
        <div className="w-80 h-full hidden md:block rounded-xl overflow-hidden bg-[#121212] shadow-2xl shadow-emerald-500/20 z-50">
          <ProfileSidebar />
        </div>

        {/* Right Content Container */}
        <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#121212] rounded-xl shadow-2xl shadow-emerald-500/10 no-scrollbar">
          <ProjectGrid />
        </main>
      </div>
    </div>
  );
};

export default App;
