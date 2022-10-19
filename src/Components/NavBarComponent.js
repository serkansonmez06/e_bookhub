import { Navbar, Collapse, Nav, NavbarText } from "reactstrap";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { selectUser } from "../Components/redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import React, { useState, useEffect } from "react";
import axios from "axios";

const NavBarComponent = () => {
  const user = useSelector(selectUser);
  const linkStyle = { color: "white", textDecoration: "none" };
  const [adminEmailDB, setAdminEmailDb] = useState({ email: "" });
  const navigate = useNavigate();

  const handleSignOut = () => {
    alertify
      .confirm(
        "Are you sure you want to sign out?",
        () => {
          auth.signOut();

          alertify.success("Sign out successful", 2.5);
          navigate("/");
        },
        () => {
          alertify.error("Sign out canceled ", 2.5);
        }
      )
      .setHeader("<em>E-Shelves</em>");
  };

  const getAdmin = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_ADMIN)
      .then((response) => {
        setAdminEmailDb({ email: response.data.at(-1) });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <div>
      <Navbar color="success" expand="md" light id="navbar">
        <img
          src="https://www.freeiconspng.com/thumbs/book-icon/book-stack-icon--icon-search-engine-16.png"
          alt="favicon"
          height="40px"
          width="30px"
        />

        <NavbarText style={{ color: "white" }}>
          <Link
            to="/"
            style={linkStyle}
            data-toggle="tooltip"
            title="Home of the book"
          >
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
              <Link
                to="/search"
                style={linkStyle}
                data-toggle="tooltip"
                title="Search any books"
              >
                | &nbsp;&nbsp; Search book &nbsp;&nbsp;
              </Link>
            </NavbarText>
            <NavbarText style={{ color: "white" }}>
              <Link
                to="notes"
                style={linkStyle}
                data-toggle="tooltip"
                title="Create new note"
              >
                | &nbsp;&nbsp; Notes &nbsp;&nbsp;
              </Link>
            </NavbarText>
          </Nav>
          <NavbarText>
            <span
              style={{
                color: "orange",
                fontSize: "10px",
                marginLeft: "140px",
              }}
            >
              {user.email}
            </span>
            <br />

            {user.email === adminEmailDB.email.email ? (
              <Link
                to="/users"
                style={{ color: "white", textDecoration: "none" }}
                data-toggle="tooltip"
                title="Admin info"
              >
                Users &nbsp;| &nbsp;&nbsp;
              </Link>
            ) : (
              <Link
                to="/"
                style={{ color: "#198754", textDecoration: "none" }}
                data-toggle="tooltip"
                title="Admin info"
              >
                Users &nbsp;| &nbsp;&nbsp;
              </Link>
            )}

            <Link
              to="/contact"
              style={linkStyle}
              data-toggle="tooltip"
              title="Admin info"
            >
              Contact &nbsp;| &nbsp;&nbsp;
            </Link>
            <button
              onClick={handleSignOut}
              className="btn btn-dark"
              data-toggle="tooltip"
              title="Sign out"
            >
              Sign out
            </button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
