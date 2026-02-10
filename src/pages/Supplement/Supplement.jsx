import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router';
import supplements from 'public/supplements.json';
import EvidenceBadge from 'src/components/EvidenceBadge/EvidenceBadge';
import categoriesMapping from 'public/categoriesMapping.json';

function Supplement() {
  const { id } = useParams();

  const supplement = useMemo(() => {
    return supplements.find(s => s.id === parseInt(id));
  }, [id]);

  if (!supplement) {

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Supplement not found</h2>
        <Link to="/" className="text-plum hover:underline">Back to Database</Link>
      </div>
    );
  }
  const catData = categoriesMapping[supplement.category] || categoriesMapping.default;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen">
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-plum mb-6 transition-colors">
        <i className="bi bi-arrow-left me-2"></i> Back to Database
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
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
              <EvidenceBadge evidenceLevel={supplement.evidenceLevel} />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplement;