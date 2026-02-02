import React from 'react';
import supplements from "public/supplements.json";
import categoriesMapping from "public/categoriesMapping.json";

function Categories() {
  const supplementsCategories = [...new Set(supplements.map(supplement => supplement.category))];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-dark mb-12">
        Explore <span className="text-purple-400">Categories</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {supplementsCategories.map((category, index) => (
          <div
            key={index}
            className={`group relative ${categoriesMapping[category].bg} rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-center h-48`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

            <div className="mb-4 p-4 rounded group-hover:bg-purple-500/20 transition-colors duration-300 relative z-10">
              <i className={`${categoriesMapping[category].iconClass} text-3xl ${categoriesMapping[category].text}`}></i>
            </div>

            <h3 className={`text-xl font-bold ${categoriesMapping[category].text} capitalize tracking-wide relative z-10`}>
              {category}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;