import { Card } from "react-bootstrap";
import AddFilmForm from "./AddFilmForm";

function AddFilmCard({ setRefresh }) {
    return(
        <Card bg="dark" border="info" style={{color: 'white'}} className="mt-3">
            <AddFilmForm setRefresh={setRefresh} />
        </Card>
    );
}

export default AddFilmCard;
