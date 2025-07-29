import API from "../../lib/API";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

function LoginCard() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginData.username.trim() === '' || loginData.password.trim() === '') {
            setShowAlert(true);
            return;
        }
        try {
            await login(
                loginData.username,
                loginData.password
            );
            navigate("/films");
            } catch (err) {
                console.log(`components/AuthN/index.jsx:\n${err.error}`);
            }
    }

    return(
        <Card bg="dark" border="info" style={{color: 'white'}} className="mt-3">
            <Card.Body>
                <Card.Title>LOGIN</Card.Title>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={loginData.username}
                            placeholder="Enter username"
                            onChange={e => { setShowAlert(false); setLoginData({ ...loginData, username: e.target.value}); }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={loginData.password}
                            placeholder="Enter password"
                            onChange={e => { setShowAlert(false); setLoginData({ ...loginData, password: e.target.value}); }}
                        />
                    </Form.Group>

                    <div style={{ height: "4rem" }}>
                    {showAlert && (
                        <Alert
                            dismissible
                            variant="warning"
                            onClose={() => setShowAlert(false)}
                            >
                                Username or password missing
                        </Alert>
                    )}
                    </div>

                    <Card.Footer className="d-flex justify-content-center">
                        <Button variant="warning" type="submit" className="d-flex align-items-center gap-2">
                            <i className="bi bi-door-open-fill" />
                            <div className="ml-2">LOGIN</div>
                        </Button>
                    </Card.Footer>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LoginCard;