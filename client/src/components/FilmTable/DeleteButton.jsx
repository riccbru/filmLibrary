import API from "../../lib/API";
import { Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

function DeleteButton({ fid, setRefresh }) {

  const { token } = useAuth();
  const handleClick = () => {
    API.deleteFilm(token, fid)
      .then(() => { setRefresh(true); })
      .catch((err) => { console.log(err); });
  }

  return (
    <Button variant="danger" onClick={handleClick}>
      <i className="bi bi-trash-fill" />
    </Button>
  );
}

export default DeleteButton;
