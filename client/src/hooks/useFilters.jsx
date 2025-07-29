import { useContext } from 'react';
import { FilterContext } from '../contexts/FilterContext';

const useFilters = () => {
    
    const context = useContext(FilterContext);
  
    if (!context) {
      throw new Error("useFilter must be used within an FilterProvider");
    }
  
    return context;
};

export { useFilters };