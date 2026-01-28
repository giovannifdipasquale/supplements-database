import React from "react";

function Table() {
  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                Name
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  ></path>
                </svg>
              </p>
            </th>

            <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                Category
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  ></path>
                </svg>
              </p>
            </th>

            <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                Evidence Level
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  ></path>
                </svg>
              </p>
            </th>

            <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className="flex items-center justify-between gap-2 text-sm font-normal leading-none text-slate-800">
                Tags
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  ></path>
                </svg>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Creatine Monohydrate
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                Physical Performance
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Strength
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Muscle Mass
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Recovery
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Caffeine Anhydrous
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">Stimulants</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Energy
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Focus
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Metabolism
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Ashwagandha (KSM-66)
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">Adaptogens</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">B (High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Stress
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Anxiety
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Sleep
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Magnesium Bisglycinate
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">Minerals</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Sleep
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Recovery
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Cramps
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                L-Theanine
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">Nootropics</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">B (High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Focus
                </span>
                <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Calm
                </span>
                <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Anxiety
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Omega-3 (Fish Oil)
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">General Health</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Heart
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Brain
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Inflammation
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Melatonin
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">Sleep</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Sleep
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Jet Lag
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Tribulus Terrestris
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">Libido</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                C (Low/Controversial)
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Libido
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Energy
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Vitamin D3
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">General Health</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Immunity
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Bones
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Mood
                </span>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800 font-semibold">
                Beta-Alanine
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">
                Physical Performance
              </p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <p className="block text-sm text-slate-800">A (Very High)</p>
            </td>
            <td className="p-4 border-b border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Endurance
                </span>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Fatigue
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
