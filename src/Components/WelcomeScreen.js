import React, { useState } from "react";
import LoginComponent from "./LoginComponent";

const WelcomeScreen = () => {
  const [signIn, setSignIn] = useState(false);

  const pStyle = {
    backgroundImage: `url(https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
  };

  return (
    <div>
      <div style={pStyle}>
        {signIn ? (
          <LoginComponent value={pStyle} />
        ) : (
          <>
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-ride="carousel"
              data-interval="3000"
            >
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
                data-interval="3000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      style={{ height: "100%" }}
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt="First slide"
                    />
                    <div className="carousel-caption">
                      <div
                        style={{ height: "60%", width: "50%", color: "beige" }}
                      >
                        <p className="text-justify">
                          <span> E-Shelves </span>
                          has made it easy to find any book at the best price
                          and you'll find just the right book. E-Shelves
                          searches the inventories of over 100,000 booksellers
                          worldwide, accessing millions of books in just one
                          simple step. You can simply sing up! search books and
                          keep notes of your chioce. Don't wait. Get started.
                          Swipe right...
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img
                      style={{ height: "100%" }}
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1431608660976-4fe5bcc2112c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt="Third slide"
                    />
                    <div className="carousel-caption">
                      <button
                        onClick={() => {
                          setSignIn(true);
                        }}
                        className="btn btn-warning"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
