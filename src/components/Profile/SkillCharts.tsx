import React from "react";
import ReactECharts from "echarts-for-react";
import { PROFILE_DATA } from "../../data/stacks/constants";

// Ring Chart for Languages
export const LanguageChart: React.FC = () => {
  return (
    <div className="flex justify-around items-center py-4">
      {PROFILE_DATA.languages.map((lang) => {
        const option = {
          tooltip: { show: false },
          series: [
            {
              type: "pie",
              radius: ["70%", "90%"],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: { show: false },
              data: [
                {
                  value: lang.value,
                  itemStyle: { color: lang.color },
                },
                {
                  value: 100 - lang.value,
                  itemStyle: { color: "#374151" },
                },
              ],
            },
          ],
        };

        return (
          <div key={lang.name} className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 relative">
              <ReactECharts
                option={option}
                style={{ height: "100%", width: "100%" }}
                opts={{ renderer: "svg" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-400">
                {lang.value}%
              </div>
            </div>
            <span className="text-sm font-medium text-gray-300">
              {lang.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Custom Progress Bar for Skills (Replacing Echarts)
export const TechStackChart: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {PROFILE_DATA.skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1 text-sm text-gray-300">
            <span>{skill.name}</span>
            <span>{skill.value}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-emerald-400 h-2.5 rounded-full"
              style={{ width: `${skill.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
