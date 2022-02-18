import { useRef } from "react";
import { auth } from "../firebase";

const LoginComponent = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  console.log("test");
  const register = (e) => {
    console.log("register");
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signIn = (e) => {
    console.log("signIn");
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <section className="vh-100vh" {...props.value.backgroundColor}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input
                      ref={emailRef}
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
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    onClick={signIn}
                  >
                    Login
                  </button>

                  <hr className="my-4" />

                  <button
                    className="btn btn-lg btn-block btn-primary d-flex justify-content-center"
                    style={{
                      backgroundColor: "#dd4b39",
                    }}
                  >
                    <span>
                      New to E-Shelves?
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg> */}
                    </span>
                    <span onClick={register}>
                      <> &nbsp;</>

                      <u className="font-weight-bold">SiGN UP NOW!</u>
                    </span>
                  </button>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginComponent;
