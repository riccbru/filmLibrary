import API from "../../lib/API";
import { Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

function UpdateButton({ i, fid, flipEditMode, updateFilm, setRefresh }) {

  const { token } = useAuth();
  const handleUpdate = () => {
    API.updateFilm(token, fid, updateFilm)
      .then(() => {
        flipEditMode(i);
        setRefresh(true);
      })
      .catch((err) => { console.log(err); });
  }

  const handleCancel = () => {
    flipEditMode(i);
  }

  return (
    <div className="d-flex justify-content-center gap-1">

        {/* BOTTONE PER UPDATE */}
      <Button variant="secondary" onClick={handleUpdate}>
        <i className="bi bi-check-square" />
      </Button>

      {/* BOTTONE PER ANNULLARE */}
      <Button variant="danger" onClick={handleCancel}>
        <i className="bi bi-x-square" />
      </Button>

    </div>
  );
}

export default UpdateButton;
