import dayjs from "dayjs";

const filters = {
    "all": {
        'id': 'all',
        'label': 'All',
        filterFunction: () => true
    },
    "favorite": {
        'id': 'favorite',
        'label': 'Favorite',
        filterFunction: film => film.favorite
    },
    "best": {
        'id': 'best',
        'label': 'Best',
        filterFunction: film => film.rating === 5
    },
    "recent": {
        'id': 'recent',
        'label': 'Recent',
        filterFunction: film => {
            if (!film.watchDate) return false;
            return dayjs().diff(film.watchDate, 'month') === 0
        }
    },
    "unwatched": {
        'id': 'unwatched',
        'label': 'Unwatched',
        filterFunction: film => !film.watchDate
    }
}

export { filters };