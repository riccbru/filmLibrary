import { Col, Container, Row } from "react-bootstrap";
import LoginCard from "../../components/AuthN";

function LoginLayout() {
    return(
        <Container>
            <Row>
                <Col md={4} />
                <Col md={4}>
                    <LoginCard />
                </Col>
                <Col md={4} />
            </Row>
        </Container>
    );
}

export default LoginLayout;