import React from 'react';
import { Link } from 'react-router';
import EvidenceBadge from 'src/components/EvidenceBadge/EvidenceBadge';
import categoriesMapping from 'public/categoriesMapping.json';

const Card = ({ supplement, isAdded, onToggle, variant = 'compact' }) => {
    const catData = categoriesMapping[supplement.category] || categoriesMapping.default;

    // Render the "Add/Remove" icon button
    const renderToggleIcon = () => (
        <div className="flex text-xl items-center justify-center cursor-pointer transition-transform active:scale-95 mt-4" onClick={(e) => {
            e.preventDefault(); // Prevent link navigation if inside a link
            onToggle(supplement.id);
        }}>
            {isAdded ? (
                <button className="bg-amethyst-smoke text-gray-900 font-bold py-2 px-4 border-b-4 rounded">
                    Remove
                </button>
            ) : (
                <button className="bg-teal-500 text-gray-900 font-bold py-2 px-4 border-b-4 rounded">
                    Add
                </button>
            )}
        </div>
    );

    if (variant === 'full') {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
                        {/* Mobile-friendly toggle for Full view if desired, or keep it in content */}
                        <img
                            src={supplement.imageUrl}
                            alt={supplement.name}
                            className="max-h-64 object-contain mix-blend-multiply"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                                    <i className={`bi ${catData.iconClass} mx-2`}></i> {supplement.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 my-4">{supplement.name}</h1>
                                <p className="text-gray-500 text-lg mb-4">{supplement.primaryGoal}</p>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {supplement.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Recommended Dosage</p>
                                <p className="font-medium text-slate-800">{supplement.dosage}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Timing</p>
                                <p className="font-medium text-slate-800">{supplement.timing}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Tags & Benefits</h3>
                            <div className="flex flex-wrap gap-2">
                                {supplement.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {supplement.warnings && supplement.warnings.length > 0 && (
                            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
                                <h4 className="flex items-center text-amber-800 font-semibold mb-2">
                                    <i className="bi bi-exclamation-triangle-fill me-2 text-amber-500"></i> Warnings
                                </h4>
                                <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                                    {supplement.warnings.map((warning, idx) => (
                                        <li key={idx}>{warning}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="mt-2 border-t border-zinc-200 pt-2">
                            {renderToggleIcon()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Compact variant (Table mobile view)
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 mb-4 p-4">
            <div className="flex items-start justify-between mb-3">
                <div>
                    {/* Add Link here if desired, otherwise title is static */}
                    <h3 className="text-lg font-bold text-gray-900 my-3">
                        <Link to={`/supplement/${supplement.id}`} className="hover:text-plum transition-colors">
                            {supplement.name}
                        </Link>
                    </h3>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-black/10 ${catData.bg} ${catData.text}`}>
                        <i className={`bi ${catData.iconClass} mx-2`}></i> {supplement.category}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{supplement.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-xs text-slate-500">Dosage</p>
                    <p className="text-sm font-medium">{supplement.dosage}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-xs text-slate-500">Timing</p>
                    <p className="text-sm font-medium">{supplement.timing}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
                {supplement.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-600">
                        {tag}
                    </span>
                ))}
            </div>
            {supplement.warnings && supplement.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                    <h4 className="flex items-center text-amber-800 font-semibold mb-2">
                        <i className="bi bi-exclamation-triangle-fill me-2 text-amber-500"></i> Warnings
                    </h4>
                    <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                        {supplement.warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-2 border-t border-zinc-200 pt-2">
                {renderToggleIcon()}
            </div>
        </div>
    );
};

export default Card;
