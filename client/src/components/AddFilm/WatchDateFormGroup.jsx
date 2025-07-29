import { Form } from "react-bootstrap";

function WatchDateFormGroup({ newFilm, setNewFilm }) {
  return (
    <Form.Group>
      <Form.Label>Watch date</Form.Label>
      <Form.Control
        type="date"
        value={newFilm.watchDate}
        onChange={(e) => setNewFilm({ ...newFilm, watchDate: e.target.value })}
      />
    </Form.Group>
  );
}

export default WatchDateFormGroup;
