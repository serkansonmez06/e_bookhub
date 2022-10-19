import React, { useState, useRef } from "react";

import { auth } from "../firebase";
import LoginComponent from "./LoginComponent";
import axios from "axios";
import alertify from "alertifyjs";

const SignUpComponent = () => {
  const [signIn, setSignIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const pStyle = {
    backgroundImage: `url(https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
  };

  const register = () => {
    // console.log("register");

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        // console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUserDB = async () => {
    await axios
      .post("http://localhost:4545/saveUser", user)
      .then((response) => {
        setUser(response.data);
        alertify.success("you have been created your account successfully");
      })
      .catch((err) => {
        console.log(err);
        alertify.error("Failed to create new accout");
      });
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      {signIn ? (
        <LoginComponent value={pStyle} />
      ) : (
        <section className="vh-100vh">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Create Account</h3>

                    <div className="form-outline mb-4">
                      <input
                        ref={emailRef}
                        onChange={handleOnChange}
                        name="email"
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        onChange={handleOnChange}
                      />
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="btn btn-lg btn-block btn-primary "
                      type="submit"
                      style={{
                        backgroundColor: "#dd4b39",
                      }}
                      onClick={() => {
                        register();
                        setSignIn(true);
                        saveUserDB();
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SignUpComponent;
