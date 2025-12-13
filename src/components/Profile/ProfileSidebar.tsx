import React from "react";
import { PROFILE_DATA } from "../../data/stacks/constants";
import { LanguageChart, TechStackChart } from "./SkillCharts";
import { FaGithub, FaDiscord } from "react-icons/fa";

const ProfileSidebar: React.FC = () => {
  return (
    <aside className="w-full h-full relative">
      {/* Fixed Header */}
      <div className="absolute top-0 inset-x-0 h-48 bg-[#181818] z-50 flex flex-col items-center justify-center gap-y-4 shadow-md">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500">
          <img
            src="/defaultProfileImage.svg"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect fill='%23374151' width='150' height='150'/%3E%3Ctext fill='%239CA3AF' font-family='sans-serif' font-size='20' dy='7' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EProfile%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-gray-200 text-lg font-bold">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center font-medium">
            {PROFILE_DATA.job}
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col overflow-y-scroll h-full pt-48 pb-10 space-y-6 px-6 no-scrollbar text-sm">
        {/* Bio */}
        <div className="mt-6 text-center text-gray-400 text-xs leading-relaxed">
          {PROFILE_DATA.bio}
        </div>

        <hr className="border-gray-700" />

        {/* Info List */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Residence</span>
            <span>{PROFILE_DATA.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Age</span>
            <span>{PROFILE_DATA.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span className="text-xs">{PROFILE_DATA.email}</span>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Languages */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Languages</h3>
          <LanguageChart />
        </div>

        <hr className="border-gray-700" />

        {/* Skills */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Expertise</h3>
          <TechStackChart />
        </div>

        <hr className="border-gray-700" />

        {/* Tools */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Tools</h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {PROFILE_DATA.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-1 bg-gray-700 rounded text-xs border border-gray-600"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-[#181818] z-50 flex justify-center items-center gap-4 text-xl border-t border-gray-800">
        <a
          href={PROFILE_DATA.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href={PROFILE_DATA.social.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaDiscord />
        </a>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
