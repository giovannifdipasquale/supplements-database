import React, { useMemo, useContext } from 'react';
import { useParams, Link } from 'react-router';
import supplements from 'public/supplements.json';
import { MySupplementsContext } from "src/context/MySupplementsContext";
import Card from 'src/components/Card/Card';

function Supplement() {
  const { id } = useParams();
  const { isAdded, addSupplement, removeSupplement } = useContext(MySupplementsContext);

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

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen">
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-plum mb-6 transition-colors">
        <i className="bi bi-arrow-left me-2"></i> Back to Database
      </Link>

      <Card
        supplement={supplement}
        isAdded={isAdded(supplement.id)}
        onToggle={isAdded(supplement.id) ? removeSupplement : addSupplement}
        variant="full"
      />
    </div>
  );
}

export default Supplement;