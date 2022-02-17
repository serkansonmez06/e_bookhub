import React from "react";
import { Navbar, Collapse, Nav, NavbarText } from "reactstrap";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { selectUser } from "../Components/redux/userSlice";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  const user = useSelector(selectUser);
  const linkStyle = { color: "white", textDecoration: "none" };
  return (
    <div>
      <div>
        <Navbar color="success" expand="md" light>
          <img
            src="https://freepngimg.com/download/book/37121-5-book-transparent.png"
            alt="favicon"
            height="40px"
            width="30px"
          />

          <NavbarText style={{ color: "white" }}>
            <Link to="/" style={linkStyle}>
              &nbsp; E-Shelves &nbsp;&nbsp;
            </Link>
          </NavbarText>
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavbarText
                style={{
                  color: "white",
                  marginRight: "5px",
                }}
              >
                <Link to="/search" style={linkStyle}>
                  | &nbsp;&nbsp; Search book &nbsp;&nbsp;
                </Link>
              </NavbarText>
              <NavbarText style={{ color: "white" }}>
                <Link to="notes" style={linkStyle}>
                  | &nbsp;&nbsp; Notes
                </Link>
              </NavbarText>
            </Nav>
            <NavbarText>
              <span style={{ color: "orange", fontSize: "10px" }}>
                {user.email}
              </span>
              <br />
              <button onClick={() => auth.signOut()} className="btn btn-dark">
                Sign Out
              </button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBarComponent;
