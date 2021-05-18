import { Button, Container, Nav, Navbar } from "react-bootstrap"
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
                        <Nav.Link href='/'>Find a spot</Nav.Link>
                        <Nav.Link href='/map'>Map</Nav.Link>
                        <Nav.Link href='/list'>List view</Nav.Link>
                        {currentUser && <Nav.Link href='/profile'>Profile</Nav.Link>}
                        {currentUser && <Button onClick={logout}>Logout</Button>}
                        {!currentUser && <Nav.Link href='/signup'>Sign up</Nav.Link>}
                        {!currentUser && <Nav.Link href='/login'>Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
        </>
    )
}

export default Navigation