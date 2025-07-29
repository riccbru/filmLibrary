import { Form } from "react-bootstrap";

function TitleFormGroup({ newFilm, setNewFilm, setShowAlert }) {
  return (
    <Form.Group>
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        value={newFilm.title}
        placeholder="Enter title"
        onChange={(e) => {
          setShowAlert(false);
          setNewFilm({ ...newFilm, title: e.target.value });
        }}
      />
    </Form.Group>
  );
}

export default TitleFormGroup;