import React, { useState, useEffect, useContext } from "react";
import { motion } from 'motion/react';
import categoriesMapping from "public/categoriesMapping.json";
import { MySupplementsContext } from "src/context/MySupplementsContext";


function Table({ supplements = [], category = null }) {
  const { addSupplement, removeSupplement, isAdded } = useContext(MySupplementsContext);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  if (!Array.isArray(supplements)) {
    return <div>No supplements data available.</div>;
  }

  // Filter
  let filteredSupplements = category
    ? supplements.filter(s => s.category === category)
    : supplements;

  // Sort
  const sortedSupplements = [...filteredSupplements].sort((a, b) => {
    const valA = a[sortBy]?.toString() || "";
    const valB = b[sortBy]?.toString() || "";

    return sortOrder === 'asc'
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
  const sortSupplements = (supplementsKey) => {
    setSortBy(supplementsKey);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  if (category != null) {

    return (
      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -40 }} transition={{ duration: 0.2 }} ease="easeInOut" className={`fixed z-99 top-2/3 left-0 w-full h-full overflow-scroll shadow-md rounded-lg bg-clip-border ${categoriesMapping[category].bg}`}>
        <table className="w-full text-left table-auto min-w-max ">
          <thead>
            <tr>
              <th onClick={() => sortSupplements('name')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'name' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                  Name
                  {
                    (sortOrder === 'asc' && sortBy === 'name') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                  }
                </p>
              </th>

              <th onClick={() => sortSupplements('evidenceLevel')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'evidenceLevel' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                  Evidence Level
                  {
                    (sortOrder === 'asc' && sortBy === 'evidenceLevel') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                  }
                </p>
              </th>

              <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none`}>
                  Tags
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none`}>
                  Add
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSupplements.map((supplement) => (
              <tr key={supplement.id} className="hover:bg-zinc-500">
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800 font-semibold">
                    {supplement.name}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {supplement.evidenceLevel}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {supplement.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-zinc-500 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200">
                  {isAdded(supplement.id) ? (
                    <button
                      onClick={() => removeSupplement(supplement.id)}
                      className="cursor-pointer text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      <i className="bi bi-dash-circle text-xl"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => addSupplement(supplement.id)}
                      className="cursor-pointer text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      <i className="bi bi-plus-circle text-xl"></i>
                    </button>
                  )}
                </td>              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  }
  else {
    return (
      <div className="relative flex flex-col w-full h-full overflow-scroll bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th onClick={() => sortSupplements('name')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'name' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                  Name
                  {
                    (sortOrder === 'asc' && sortBy === 'name') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                  }
                </p>
              </th>

              <th onClick={() => sortSupplements('category')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'category' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                  Category
                  {
                    (sortOrder === 'asc' && sortBy === 'category') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                  }
                </p>
              </th>

              <th onClick={() => sortSupplements('evidenceLevel')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'evidenceLevel' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                  Evidence Level
                  {
                    (sortOrder === 'asc' && sortBy === 'evidenceLevel') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                  }
                </p>
              </th>

              <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none`}>
                  Tags
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-zinc-500 hover:bg-slate-100">
                <p className={`flex items-center justify-between gap-2 text-sm leading-none`}>
                  Add
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSupplements.map((supplement) => (
              <tr key={supplement.id} className="hover:bg-zinc-500">
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800 font-semibold">
                    {supplement.name}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {supplement.category}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {supplement.evidenceLevel}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {supplement.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-zinc-500 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 border-b border-slate-200">
                  {isAdded(supplement.id) ? (
                    <button
                      onClick={() => removeSupplement(supplement.id)}
                      className="cursor-pointer text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      <i className="bi bi-dash-circle text-xl"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => addSupplement(supplement.id)}
                      className="cursor-pointer text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      <i className="bi bi-plus-circle text-xl"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
