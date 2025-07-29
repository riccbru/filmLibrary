import { Outlet } from "react-router-dom";
import FilmNavbar from "../../components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

function Common() {

    return(
        <>
            <FilmNavbar />
            <Container fluid>
                <Row>
                    <Col md={2} />
                    <Col md={8}>
                        <Outlet />
                    </Col>
                    <Col md={2} />
                </Row>
            </Container>
        </>
    );
}

export default Common;