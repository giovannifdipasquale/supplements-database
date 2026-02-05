import React, { useState } from 'react';
import supplements from "public/supplements.json";
import categoriesMapping from "public/categoriesMapping.json";
import { motion } from 'motion/react';
import Table from 'src/components/Table/Table'
import macroCategories from "src/data/macroCategories.json";
function Categories() {
  const supplementsCategories = macroCategories.map(category => category.name);
  // const supplementsCategories = [...new Set(supplements.map(supplement => supplement.category))];
  const [category, setCategory] = useState(null);
  return (
    <div className={`max-w-7xl min-h-screen mx-auto ${category ? 'pb-[40vh]' : ''}`}>
      <h1 className="text-4xl font-bold text-center text-dark mb-12">
        Explore <span className="text-purple-400">Categories</span>
      </h1>

      <div className="space-y-16">
        {macroCategories.map((macro, macroIndex) => (
          <div key={macroIndex} className="animate-fade-in-up">
            {/* Macro Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
              <div className={`p-3 rounded-lg ${macro.bg} ${macro.text}`}>
                <i className={`${macro.iconClass} text-2xl`}></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{macro.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{macro.description}</p>
              </div>
            </div>

            {/* Sub-Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {macro.subCategories.map((sub, index) => {
                const style = categoriesMapping[sub] || categoriesMapping.default;
                const isSelected = category === sub;

                return (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={index}
                    onClick={() => setCategory(sub)}
                    className={`
                      relative group cursor-pointer rounded-xl p-5 border 
                      transition-all duration-300 flex flex-col items-center justify-center h-40
                      ${isSelected
                        ? 'ring-2 ring-indigo-500 shadow-lg bg-white border-transparent'
                        : 'border-slate-100 bg-white hover:shadow-md hover:border-indigo-200'}
                    `}
                  >
                    {/* Background Soft Color Overlay */}
                    <div className={`absolute inset-0 opacity-10 rounded-xl ${style.bg} group-hover:opacity-20 transition-opacity`}></div>

                    <div className={`mb-3 p-3 shadow-sm relative z-10`}>
                      <i className={`${style.iconClass} text-2xl ${style.text}`}></i>
                    </div>

                    <h3 className={`text-sm font-bold text-center text-slate-700 relative z-10 leading-tight`}>
                      {sub}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {category != null && (
        <Table key={category} supplements={supplements} category={category} />
      )}
    </div>
  );
}

export default Categories;