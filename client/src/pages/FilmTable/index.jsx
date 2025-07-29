import { Suspense } from "react";
import LazyTable from "../../components/FilmTable";
import { useFilters } from "../../hooks/useFilters";
import FallbackSpinner from "../../components/FilmTable/FallbackSpinner";

function FilmTableLayout({ films, setRefresh }) {

    const { applyFilters } = useFilters();
    const filteredFilms = applyFilters(films);

    return(
        <Suspense fallback={<FallbackSpinner />}>
            <LazyTable films={filteredFilms} setRefresh={setRefresh} />
        </Suspense>
    );
}

export default FilmTableLayout;