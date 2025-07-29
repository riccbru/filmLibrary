import { filters as filtersList } from "../lib/filters";
import { createContext, useState } from 'react';

const FilterContext = createContext();

function FilterProvider({ children }) {

    const [searchText, setSearchText] = useState('');
    const [filters] = useState(filtersList);
    const [activeFilter, setActiveFilter] = useState('all');

    const applyFilters = (films) => {
        const filterFn = filters[activeFilter]?.filterFunction || (() => true);
        return films.filter(filterFn).filter(
            film =>
                film.title.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const value = {
        filters, applyFilters,
        searchText, setSearchText,
        activeFilter, setActiveFilter
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}

export { FilterProvider, FilterContext };