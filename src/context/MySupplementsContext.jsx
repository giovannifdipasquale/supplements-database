import { useState, createContext, useEffect } from 'react';
import supplements from 'public/supplements.json';
import { toast } from 'sonner';
export const MySupplementsContext = createContext();

export const MySupplementsProvider = ({ children }) => {
    const [mySupplements, setMySupplements] = useState(() => {
        try {
            const saved = localStorage.getItem("mySupplementsList");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading supplements from localStorage", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("mySupplementsList", JSON.stringify(mySupplements));
    }, [mySupplements]);

    // Consistent logic for array of IDs
    const addSupplement = (id) => {
        if (!mySupplements.includes(id)) {
            setMySupplements(prev => [...prev, id]);
            toast.success("Supplement added to your list!");
        }
    };

    const removeSupplement = (id) => {
        setMySupplements(prev => prev.filter(itemId => itemId !== id));
    };

    const isAdded = (id) => mySupplements.includes(id);

    return (
        <MySupplementsContext.Provider value={{ mySupplements, addSupplement, removeSupplement, isAdded }}>
            {children}
        </MySupplementsContext.Provider>
    );
};