import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useFilters } from "../../hooks/useFilters";

function FilmNavbar() {

  const {
        filters,
        activeFilter,
        setActiveFilter,
        searchText,
        setSearchText
    } = useFilters();
  
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container className='main-header'>
          <Navbar.Brand href="/films" className='navbar-brand'>Film Library</Navbar.Brand>
        <Nav className="me-auto">
            {Object.values(filters).map((f, index) => {
              return (
                <Nav.Link
                  key={index}
                  href={`#${activeFilter}`}
                  active={activeFilter === f.id}
                  onClick={() => setActiveFilter(f.id)}
              >
                  {f.label}
              </Nav.Link>
          );
        })}
        </Nav>
        <Form>
          <FormControl
            type="search"
            value={searchText}
            placeholder="Search film title..."
            onChange={e => setSearchText(e.target.value)}
          />
        </Form>
      </Container>
    </Navbar>
  );
}

export default FilmNavbar;
