import { Spinner } from "react-bootstrap";

function FallbackSpinner() {
    return(
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '25vh' }}>
            <Spinner variant="dark" animation='border' size='lg' />
        </div>
    );
}

export default FallbackSpinner;