import API from "../../lib/API";
import { useAuth } from "../../hooks/useAuth";

function FavoriteCheckbox({ fid, favorite, setRefresh }) {

    const { token } = useAuth();
    const handleChange = () => {
        API.flipFavorite(token, fid)
            .then(() => { setRefresh(true); })
            .catch((err) => { console.log(err); });
    }

    return(
        <input type="checkbox" checked={favorite}
        onChange={handleChange}/>
    );
}

export default FavoriteCheckbox;