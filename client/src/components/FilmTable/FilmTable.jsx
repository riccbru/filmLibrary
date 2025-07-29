import dayjs from 'dayjs';
import { useState } from 'react';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import FavoriteCheckbox from './FavoriteCheckbox';
import { Button, Form, Table } from "react-bootstrap";

function FilmTable({ films, setRefresh }) {

    const navigate = useNavigate();
    const thStyle = { textAlign: 'center', verticalAlign: 'middle' }
    const [editMode, setEditMode] = useState(Array.from({length: films.length}, () => false));
    const [filmUpdate, setFilmUpdate] = useState(Array.from({length: films.length}, () => {}));

    const updateFilmField = (index, field, value) => {
        setFilmUpdate(prev => {
            const update = [...prev];
            update[index] = {...update[index], [field]: value};
            return update
        });
    }

    const flipEditMode = (i) => {
        setEditMode(prevEditMode => {
            const newArr = [...prevEditMode];
            newArr[i] = !newArr[i];
            return newArr;
        });
    }

    return(
        
        <Table responsive striped borderless variant='dark' className='text-center mt-3'>
            <thead>
                <tr>
                    <th style={thStyle}>
                        <Button variant="success" onClick={() => navigate("/add")}>
                            <i className="bi bi-database-fill-add fs-5" />
                        </Button>
                    </th>
                    <th style={thStyle}>Film ID</th>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Favorite</th>
                    <th style={thStyle}>Rating</th>
                    <th style={thStyle}>Watch Date</th>
                    <th style={thStyle}>Edit</th>
                    <th style={thStyle}>Delete</th>
                </tr>
            </thead>

            <tbody>
                {films?.map((f, index) => {
                    return (
                        <tr key={index}>
                        <td></td>
                        {/* Film ID */}
                        <td>{f.id}</td>

                        {/* Film Title */}
                        <td>{f.title}</td>

                        {/* Film Favorite Checkbox */}
                        <td><FavoriteCheckbox fid={f.id} favorite={f.favorite} setRefresh={setRefresh}/></td>

                        {/* Film Rating Stars */}
                        <td>
                        {!editMode[index] ? 
                            [...Array(5)].map((_, index) => (
                              <i
                                key={index}
                                  className={
                                      `bi bi-star${index < f.rating ? "-fill text-warning" : ""}`
                                  }
                              />
                            ))
                        :
                        <Form.Select
                            value={filmUpdate[index]?.newRating ?? f.rating ?? 0}
                            onChange={(e) => updateFilmField(index, 'newRating', e.target.value)}
                            >             
                            {[...Array(6)].map((_, index) => {
                              return <option key={index}>{index}</option>;
                            })}
                        </Form.Select>
                        }
                        </td>

                        {/* Film Watchdate */}
                        <td>
                            {!editMode[index] ?
                            f.watchDate ? dayjs(f.watchDate).format("MMMM DD, YYYY") : ""
                            :
                            <Form.Control
                                type="date"
                                value={filmUpdate[index]?.newWatchDate ?? f.watchDate ?? ''}
                                onChange={(e) => updateFilmField(index, 'newWatchDate', e.target.value)}
                            />
                            }
                        </td>

                        {/* Edit Button */}
                        <td>
                            {!editMode[index] ?
                                <EditButton
                                    fid={f.id}
                                    index={index}
                                    flipEditMode={flipEditMode}
                                    />
                                : <UpdateButton
                                    i={index}
                                    fid={f.id}
                                    setRefresh={setRefresh}
                                    flipEditMode={flipEditMode}
                                    updateFilm={{
                                        newRating: filmUpdate[index]?.newRating ?? f.rating ?? 0,
                                        newWatchDate: filmUpdate[index]?.newWatchDate ?? f.watchDate ?? '',
                                    }}
                                    />
                            }
                        </td>

                        {/* Delete Button */}
                        <td><DeleteButton fid={f.id} setRefresh={setRefresh} /></td>
                      </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default FilmTable;