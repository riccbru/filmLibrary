import { Alert } from "react-bootstrap";
    
function TitleAlert({ showAlert, setShowAlert }) {
  return (
    <div style={{ height: "4rem" }}>
      {showAlert && (
        <Alert
          dismissible
          variant="warning"
          onClose={() => setShowAlert(false)}
        >
          Title cannot be empty
        </Alert>
      )}
    </div>
  );
}

export default TitleAlert;
