import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth"


const Navigation = () => {

    const { logout, currentUser } = useAuth();

    
    return(
        <>
        <Navbar collapseOnSelect fixed='sticky' expand='sm' bg='dark' variant='dark'>
            <Container>
            <Navbar.Brand href='/'>iToilet<i className="fas fa-toilet ml-4"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {currentUser && <Link to='/main'><Nav.Link href='/'>Find a spot</Nav.Link></Link>}
                        <Link to='/map'><Nav.Link href='/map'>Map</Nav.Link></Link>
                        {currentUser && <Link to='/list'><Nav.Link href='/list'>List view</Nav.Link></Link>}
                        {currentUser && <Link to='/profile'><Nav.Link href='/profile'>Profile</Nav.Link></Link>}
                        {currentUser && <Link to='/addToilet'><Nav.Link href='/addToilet'>Add a toilet</Nav.Link></Link>}
                        {currentUser && <Button variant="outline-primary" onClick={logout}>Logout</Button>}
                        {!currentUser && <Link to='/'><Nav.Link href='/'>Join!</Nav.Link></Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
        </>
    )
}

export default Navigation