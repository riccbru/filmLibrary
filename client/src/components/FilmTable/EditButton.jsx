import { Button } from "react-bootstrap";

function EditButton({ index, flipEditMode }) {
    return(
        <Button
            variant="warning"
            onClick={() => {
                flipEditMode(index);
            }}>
            <i className="bi bi-pencil" />
        </Button>
    );
}

export default EditButton;