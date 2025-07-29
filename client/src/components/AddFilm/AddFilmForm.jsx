import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import API from "../../lib/API";
import TitleFormGroup from "./TitleFormGroup";
import WatchDateFormGroup from "./WatchDateFormGroup";
import TitleAlert from "./TitleAlert";
import RatingFavorite from "./RatingFavorite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function AddFilmForm({ setRefresh }) {

    const defaultFilm = {
        title: '',
        favorite: false,
        watchDate: '',
        rating: 0
    }

    const { token, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [newFilm, setNewFilm] = useState(defaultFilm);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newFilm.title.trim() === '') {
            setShowAlert(true);
            return;
        }
        API.addFilm(token, newFilm)
            .then(() => {
                setRefresh(true);
                setShowAlert(false);
                setNewFilm(defaultFilm);
                navigate("/films");
            })
            .catch((err) => {
                setIsLoggedIn(false);
                console.log(`AddFilmForm.jsx: ${err.error}`);
            });
    }

    return(
    <Card.Body>
        <div className="d-flex justify-content-between">
            <Card.Title><h3>Add new film</h3></Card.Title>
            <Button variant="secondary" onClick={() => navigate("/")}>
                <i className="bi bi-x fs-4" />
            </Button>
        </div>
        <Form onSubmit={handleSubmit}>

            <TitleFormGroup newFilm={newFilm} setNewFilm={setNewFilm} setShowAlert={setShowAlert} />

            <WatchDateFormGroup newFilm={newFilm} setNewFilm={setNewFilm} />

            <RatingFavorite newFilm={newFilm} setNewFilm={setNewFilm} />

            <TitleAlert showAlert={showAlert} setShowAlert={setShowAlert} />

            <Card.Footer className="d-flex justify-content-center">
                <Button variant="warning" type="submit" className="d-flex align-items-center gap-2">
                    <i className="bi bi-database-fill-add fs-4" />
                    <div className="ml-2">ADD FILM</div>
                </Button>
            </Card.Footer>
            
        </Form>
    </Card.Body>
    );
}

export default AddFilmForm;