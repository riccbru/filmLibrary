import { Form, FloatingLabel } from "react-bootstrap";

function RatingFavorite({ newFilm, setNewFilm }) {
  return (
    <div className="d-flex align-items-center gap-2 mt-3 mb-3">
      <div className="flex-grow-1">
        <FloatingLabel label="Select rating">
          <Form.Select
            value={newFilm.rating}
            onChange={(e) => setNewFilm({ ...newFilm, rating: e.target.value })}
          >
            {[...Array(6)].map((_, index) => {
              return <option key={index}>{index}</option>;
            })}
          </Form.Select>
        </FloatingLabel>
      </div>

      <Form.Check
        type="checkbox"
        label="Favorite"
        checked={newFilm.favorite}
        onChange={(e) => setNewFilm({ ...newFilm, favorite: e.target.checked })}
      />
    </div>
  );
}

export default RatingFavorite;
