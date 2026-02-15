import React, { useState, useEffect, useContext, useMemo } from "react";
import { } from 'motion/react';
import Card from 'src/components/Card/Card';
import jsonSupplements from "public/supplements.json";
import categoriesMapping from "public/categoriesMapping.json";
import { MySupplementsContext } from "src/context/MySupplementsContext";
import EvidenceBadge from "src/components/EvidenceBadge/EvidenceBadge";
import Fuse from 'fuse.js';
import { Link } from 'react-router';
import { motion } from 'motion/react';

function Table({ supplements = [], category = null, onClose = null }) {
  const { mySupplements, addSupplement, removeSupplement, isAdded } = useContext(MySupplementsContext);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  if (!Array.isArray(supplements)) {
    return <div>No supplements data available.</div>;
  }

  // #############################################
  // FILTERING STEPS START
  // #############################################

  // ---------------------------------------------
  // STEP 1: Filter State Configuration
  // ---------------------------------------------
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByEvidenceLevel, setFilterByEvidenceLevel] = useState([]);
  const [filterByMySupplements, setFilterByMySupplements] = useState(false);

  // Helper to add / remove filters
  const toggleFilter = (filter, setFilter) => {
    setFilter(elements => elements.includes(filter) ? elements.filter(f => f !== filter) : [...elements, filter]);
  }
  let filteredSupplements = useMemo(() => {
    console.log(filterByMySupplements);
    console.log(mySupplements);
    return filterByMySupplements ? supplements.filter(s => mySupplements.includes(s.id)) : supplements;
  }, [filterByMySupplements, mySupplements]);

  // ---------------------------------------------
  // STEP 2: Extract Unique Keys for Filter UI
  // ---------------------------------------------
  // 2a. Unique Categories:
  const singleCategories = [...new Set(jsonSupplements.map(s => s.category))];
  // 2b. Unique Evidence Levels:
  const singleEvidenceLevels = [...new Set(jsonSupplements.map(s => s.evidenceLevel))];

  // ---------------------------------------------
  // STEP 3: Apply Sidebar Filters (Category & Evidence)
  // ---------------------------------------------
  const filterSupplements = useMemo(() => {
    // Filter by Category
    if (filterByCategory.length > 0) {
      filteredSupplements = filterByCategory ? filteredSupplements.filter(s => filterByCategory.includes(s.category)) : filteredSupplements;
    }
    // Filter by Evidence Level
    if (filterByEvidenceLevel.length > 0) {
      filteredSupplements = filterByEvidenceLevel ? filteredSupplements.filter(s => filterByEvidenceLevel.includes(s.evidenceLevel)) : filteredSupplements;
      console.log(filterByEvidenceLevel);
    }
    return filteredSupplements;
  }, [filteredSupplements, filterByCategory, filterByEvidenceLevel, supplements]);

  // #############################################
  // FILTERING STEPS CONTINUES
  // #############################################


  // ---------------------------------------------
  // STEP 4: Apply Prop-based Category Filter (If Any)
  // ---------------------------------------------
  const catFilteredSupplements = useMemo(() => {
    return category
      ? filterSupplements.filter(s => s.category === category)
      : filterSupplements;
  }, [category, filterSupplements]);

  // ---------------------------------------------
  // STEP 5: Apply Text Search (Fuse.js)
  // ---------------------------------------------
  const searchOptions = useMemo(() => ({
    keys: ['tags', 'name', 'category'],
    threshold: 0,
  }), []);

  const fuse = useMemo(() => new Fuse(catFilteredSupplements, searchOptions), [catFilteredSupplements, searchOptions]);

  const searchResults = useMemo(() => {
    return query
      ? fuse.search(query).map(result => result.item)
      : catFilteredSupplements;
  }, [query, fuse, catFilteredSupplements]);

  // ---------------------------------------------
  // STEP 6: Apply Sorting
  // ---------------------------------------------
  const results = useMemo(() => {
    return [...searchResults].sort((a, b) => {
      const valA = a[sortBy]?.toString() || "";
      const valB = b[sortBy]?.toString() || "";

      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [searchResults, sortBy, sortOrder]);

  const sortSupplements = (supplementsKey) => {
    setSortBy(supplementsKey);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (category != null) {
    const catData = categoriesMapping[category] || categoriesMapping.default;

    return (
      // ANIMATED TABLE (FROM CATEGORIES)
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-98 cursor-pointer"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.04 }}
          className={`hidden md:block p-6 border-2 border-zinc-500 rounded-2xl ${catData.bg} z-99 fixed top-1/2 left-1/2 w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl bg-clip-border`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer group"
          >
            <i className="bi bi-x-lg text-2xl text-slate-600 group-hover:text-slate-900"></i>
          </button>
          <div className="">
            <div className="text-center">
              <span className={`category-pill inline-flex items-center rounded-md px-2 py-1 text-lg font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                <i className={`bi ${catData.iconClass} me-2`}></i> {category}
              </span>
            </div>
            <div className="grid grid-cols-12 p-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search supplements..."
                className="col-span-12 w-full p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <table className="w-full hidden md:table text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th onClick={() => sortSupplements('name')} className=" p-4 transition-colors cursor-pointer border-b border-slate-300 hover:bg-slate-100">
                    <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'name' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                      Name
                      {
                        (sortOrder === 'asc' && sortBy === 'name') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                      }
                    </p>
                  </th>

                  <th onClick={() => sortSupplements('category')} className=" p-4 transition-colors cursor-pointer border-b border-slate-300 hover:bg-slate-100">
                    <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'category' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                      Category
                      {
                        (sortOrder === 'asc' && sortBy === 'category') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                      }
                    </p>
                  </th>

                  <th onClick={() => sortSupplements('evidenceLevel')} className=" p-4 transition-colors cursor-pointer border-b border-slate-300 hover:bg-slate-100">
                    <p className={`flex items-center justify-between gap-2 text-sm leading-none ${sortBy === 'evidenceLevel' ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>
                      Evidence Level
                      {
                        (sortOrder === 'asc' && sortBy === 'evidenceLevel') ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>
                      }
                    </p>
                  </th>
                  <th className="w-30 p-4 transition-colors cursor-pointer border-b border-slate-300 hover:bg-slate-100">
                    <p className={`flex items-center justify-between gap-2 text-sm leading-none`}>
                      My Stack
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((supplement) => {
                  const catData = categoriesMapping[supplement.category] || categoriesMapping.default;
                  return isAdded(supplement.id) ? (
                    <tr key={supplement.id} className="table-body-row cursor-pointer hover:bg-zinc-50 transition duration-300 ease-in-out">
                      <td className="p-4 border-b border-slate-200 second-td">
                        <p className="block text-sm text-slate-800 font-semibold">
                          <Link className="" to={`/supplement/${supplement.id}`}>
                            {supplement.name}
                          </Link>
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="text-left">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                            <i className={`bi ${catData.iconClass} me-2`}></i> {supplement.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200 fourth-td">
                        <div className="block text-sm text-slate-800">
                          <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200 fifth-td">
                        <div className="pointer-cursor flex text-xl items-center justify-center">
                          <i onClick={() => removeSupplement(supplement.id)} className="bi bi-check-circle-fill text-teal-500"></i>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={supplement.id} className="table-body-row cursor-pointer hover:bg-plum transition duration-300 ease-in-out">
                      <td className="p-4 border-b border-slate-200 second-td">
                        <p className="block text-sm text-slate-800 font-semibold">
                          <Link className="" to={`/supplement/${supplement.id}`}>
                            {supplement.name}
                          </Link>
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="text-left">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                            <i className={`bi ${catData.iconClass} me-2`}></i> {supplement.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200 fourth-td">
                        <div className="block text-sm text-slate-800">
                          <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200 fifth-td">
                        <div className="pointer-cursor flex text-xl items-center justify-center">
                          <i className="bi bi-circle text-teal-500"></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.3 }}
          className={`block md:hidden p-6 border-2 border-zinc-500 rounded-2xl ${catData.bg} z-99 fixed top-1/2 left-1/2 w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl bg-clip-border`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer group"
          >
            <i className="bi bi-x-lg text-2xl text-slate-600 group-hover:text-slate-900"></i>
          </button>
          <div className="">
            <div className="text-center">
              <span className={`category-pill inline-flex items-center rounded-md px-2 py-1 text-lg font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                <i className={`bi ${catData.iconClass} me-2`}></i> {category}
              </span>
            </div>
            <div className="grid grid-cols-12 p-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search supplements..."
                className="col-span-12 w-full p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:hidden">
              <div className="md:hidden">
                {results.map((supplement) => (
                  <Card
                    key={supplement.id}
                    supplement={supplement}
                    isAdded={isAdded(supplement.id)}
                    onToggle={isAdded(supplement.id) ? removeSupplement : addSupplement}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }
  // STATIC TABLE
  else {
    return (
      <div className="flex w-full h-full relative overflow-hidden">
        {/* Sidebar Filter */}
        <div
          className={`
            flex-shrink-0 bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto
            ${showFilter ? "w-72 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-4"}
          `}
        >
          <div className="p-4 min-w-72">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              <button
                onClick={() => setShowFilter(false)}
                className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[var(--amethyst-smoke)] uppercase tracking-wider">Categories</h4>
                {(filterByCategory.length > 0) && (
                  <button
                    onClick={() => setFilterByCategory([])}
                    className="text-xs text-[var(--plum)] hover:underline font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {singleCategories.map((category) => (
                  <label key={category} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm cursor-pointer transition-all group">
                    <div className="relative flex items-center">
                      <input
                        onChange={() => toggleFilter(category, setFilterByCategory)}
                        checked={filterByCategory.includes(category)}
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[var(--plum)] checked:border-[var(--plum)] transition-all cursor-pointer"
                      />
                      <i className="bi bi-check absolute text-white text-lg opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                    </div>
                    <span className={`text-sm text-gray-600 group-hover:text-gray-900 transition-colors ${filterByCategory.includes(category) ? 'font-medium text-gray-900' : ''}`}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Evidence Level Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[var(--amethyst-smoke)] uppercase tracking-wider">Evidence</h4>
                {(filterByEvidenceLevel.length > 0) && (
                  <button
                    onClick={() => setFilterByEvidenceLevel([])}
                    className="text-xs text-[var(--plum)] hover:underline font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {singleEvidenceLevels.map((evidenceLevel) => (
                  <label key={evidenceLevel} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm cursor-pointer transition-all group">
                    <div className="relative flex items-center">
                      <input
                        onChange={() => toggleFilter(evidenceLevel, setFilterByEvidenceLevel)}
                        checked={filterByEvidenceLevel.includes(evidenceLevel)}
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[var(--plum)] checked:border-[var(--plum)] transition-all cursor-pointer"
                      />
                      <i className="bi bi-check absolute text-white text-lg opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                    </div>
                    <span className={`text-sm text-gray-600 group-hover:text-gray-900 transition-colors ${filterByEvidenceLevel.includes(evidenceLevel) ? 'font-medium text-gray-900' : ''}`}>
                      {evidenceLevel}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* My Stack Filter */}
            <div className="mb-6 border-t border-gray-200 pt-4">
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-all group">
                <div className="relative flex items-center">
                  <input
                    onChange={() => setFilterByMySupplements(!filterByMySupplements)}
                    checked={filterByMySupplements}
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[var(--amethyst-smoke)] checked:border-[var(--amethyst-smoke)] transition-all cursor-pointer"
                  />
                  <i className="bi bi-check absolute text-white text-lg opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                </div>
                <span className={`text-sm font-semibold text-[var(--amethyst-smoke)] group-hover:text-[var(--dusty-rose)] transition-colors`}>
                  My Stack Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white-fc relative">

          {/* Top Bar with Filter Toggle and Search */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`
                hidden md:flex p-2 rounded-md transition-all duration-200 items-center gap-2
                ${showFilter ? 'bg-[var(--plum)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
              `}
              title="Toggle Filters"
            >
              <i className={`bi ${showFilter ? 'bi-funnel-fill' : 'bi-funnel'} text-lg`}></i>
              <span className="text-sm font-medium hidden sm:inline">Filters</span>
            </button>

            <div className="flex-1 max-w-2xl relative">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search supplements..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--plum)]/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Scrollable Table Area */}
          <div className="flex-1 overflow-auto">
            <table className="hidden md:table w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm shadow-sm">
                <tr>

                  <th onClick={() => sortSupplements('name')} className="p-4 border-b border-gray-200 cursor-pointer group hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-[var(--plum)]">
                      Name
                      {sortBy === 'name' && (
                        <i className={`bi bi-caret-${sortOrder === 'asc' ? 'down' : 'up'}-fill text-[var(--plum)]`}></i>
                      )}
                    </div>
                  </th>
                  <th onClick={() => sortSupplements('category')} className="p-4 border-b border-gray-200 cursor-pointer group hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-[var(--plum)]">
                      Category
                      {sortBy === 'category' && (
                        <i className={`bi bi-caret-${sortOrder === 'asc' ? 'down' : 'up'}-fill text-[var(--plum)]`}></i>
                      )}
                    </div>
                  </th>
                  <th onClick={() => sortSupplements('evidenceLevel')} className="p-4 border-b border-gray-200 cursor-pointer group hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-[var(--plum)]">
                      Evidence
                      {sortBy === 'evidenceLevel' && (
                        <i className={`bi bi-caret-${sortOrder === 'asc' ? 'down' : 'up'}-fill text-[var(--plum)]`}></i>
                      )}
                    </div>
                  </th>
                  <th className="p-4 border-b border-gray-200 w-16"></th> {/* Stack Status */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">

                {results.map((supplement) => {
                  const catData = categoriesMapping[supplement.category] || categoriesMapping.default;
                  return isAdded(supplement.id) ? (
                    <tr key={supplement.id} className="table-body-row cursor-pointer hover:bg-zinc-50 transition duration-300 ease-in-out">

                      <td className="p-4 border-b border-slate-200 second-td">
                        <p className="block text-sm text-slate-800 font-semibold">
                          <Link className="" to={`/supplement/${supplement.id}`}>
                            {supplement.name}
                          </Link>
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="text-left">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                            <i className={`bi ${catData.iconClass} me-2`}></i> {supplement.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="block text-sm text-slate-800">
                          <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="flex text-xl items-center justify-center">
                          <i onClick={() => removeSupplement(supplement.id)} className="bi bi-check-circle-fill text-teal-500"></i>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={supplement.id} className="table-body-row cursor-pointer hover:bg-plum transition duration-300 ease-in-out">

                      <td className="p-4 border-b border-slate-200 second-td">
                        <p className="block text-sm text-slate-800 font-semibold">
                          <Link className="" to={`/supplement/${supplement.id}`}>
                            {supplement.name}
                          </Link>
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="text-left">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                            <i className={`bi ${catData.iconClass} me-2`}></i> {supplement.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="block text-sm text-slate-800">
                          <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <div className="flex text-xl items-center justify-center">
                          <i onClick={() => addSupplement(supplement.id)} className="bi bi-circle text-teal-500"></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="md:hidden mx-5">
              <div className="md:hidden mx-5">
                {results.map((supplement) => (
                  <Card
                    key={supplement.id}
                    supplement={supplement}
                    isAdded={isAdded(supplement.id)}
                    onToggle={isAdded(supplement.id) ? removeSupplement : addSupplement}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
