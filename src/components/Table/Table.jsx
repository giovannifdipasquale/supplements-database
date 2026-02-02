import React, { useState, useEffect } from "react";

function Table({ supplements }) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedSupplements = [...supplements].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });
  const sortSupplements = (supplementsKey) => {
    setSortBy(supplementsKey);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th onClick={() => sortSupplements('name')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'name' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                Name
                {
                  (sortOrder === 'asc' && sortBy === 'name') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                }
              </p>
            </th>

            <th onClick={() => sortSupplements('category')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'category' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                Category
                {
                  (sortOrder === 'asc' && sortBy === 'category') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                }
              </p>
            </th>

            <th onClick={() => sortSupplements('evidenceLevel')} className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'evidenceLevel' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                Evidence Level
                {
                  (sortOrder === 'asc' && sortBy === 'evidenceLevel') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                }
              </p>
            </th>

            <th className="p-4 transition-colors cursor-pointer border-b border-slate-300 bg-slate-50 hover:bg-slate-100">
              <p className={`flex items-center justify-between gap-2 text-sm leading-none`}>
                Tags
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSupplements.map((supplement) => (
            <tr key={supplement.id} className="hover:bg-slate-50">
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
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
