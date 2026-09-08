import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [comparedPlots, setComparedPlots] = useState(() => {
    try {
      const saved = localStorage.getItem('avm_compare_plots');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('avm_compare_plots', JSON.stringify(comparedPlots));
    } catch {
      // ignore
    }
  }, [comparedPlots]);

  const addToCompare = (plot) => {
    if (comparedPlots.length >= 3) {
      alert('You can compare up to 3 plots simultaneously. Please remove one to add another.');
      return false;
    }
    if (!comparedPlots.some((p) => p.id === plot.id)) {
      setComparedPlots((prev) => [...prev, plot]);
      return true;
    }
    return false;
  };

  const removeFromCompare = (plotId) => {
    setComparedPlots((prev) => prev.filter((p) => p.id !== plotId));
  };

  const toggleCompare = (plot) => {
    if (comparedPlots.some((p) => p.id === plot.id)) {
      removeFromCompare(plot.id);
      return false;
    } else {
      return addToCompare(plot);
    }
  };

  const clearCompare = () => {
    setComparedPlots([]);
    setIsCompareModalOpen(false);
  };

  const isComparing = (plotId) => {
    return comparedPlots.some((p) => p.id === plotId);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedPlots,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        clearCompare,
        isComparing,
        isCompareModalOpen,
        setIsCompareModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
