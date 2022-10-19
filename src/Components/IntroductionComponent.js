import React from "react";

const IntroductionComponent = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5debc",
        marginTop: "0%",
      }}
    >
      <div className=" ">
        <div
          className="d-flex justify-content-start mr-5 "
          style={{ height: "70px" }}
        >
          <p>
            <a
              className="btn btn-primary "
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              style={{
                backgroundColor: "#99610e",
                border: "none",
                marginTop: "20px",
                marginLeft: "5px",
              }}
            >
              About Us
            </a>
          </p>
          <div
            className="collapse"
            id="collapseExample"
            style={{ zIndex: "3" }}
          >
            <div
              className="card card-body ml-5 text-justify"
              style={{ backgroundColor: "#e6c697" }}
            >
              E-Shelves is a one-stop self-study search engine project that
              searches over 150 million books for sale—new, used, rare,
              out-of-print, and textbooks. We save you time and money by
              searching every major catalog online. When you find a book you
              like, you can buy it directly from the original seller; we never
              charge a markup. We are heavy readers, and buy several dozen books
              every year using our own search engine. We enjoy advocating for a
              strong, diverse, bookselling industry. E-Shelves was launched in
              2022 by Capgemini Software Engineer Serkan Sonmez. Over the years,
              both users and the press have discovered why we are one of the
              most useful resources for bibliophiles online. Whether you collect
              rare books or buy cheap paperbacks to read on the train, we think
              you will appreciate our breadth, precision, and unbiased results.
              Our searchable inventory 150+ million books for sale new, used,
              rare, out-of-print, textbooks books from booksellers in 50+
              countries books written in English.
            </div>
          </div>
        </div>
        <div className=" mt-2 mb-5" style={{ position: "relative" }}>
          <img
            src="https://i.insider.com/61d462c257bd6c00185873f7?width=1300&format=jpeg&auto=webp"
            alt="bookonTable"
            style={{
              //objectFit: "cover",
              objectFit: "fill",
              width: "80%",
              height: "350px",
              boxShadow: "22px 22px 25px #b37924",
            }}
            className="rounded"
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "25%",
              fontFamily: "Times",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Search any books and buy it <br /> directly from original seller!
          </div>
        </div>
        <div className="container mb-5 ">
          <div className="row">
            <div
              className="col-sm border-none  "
              style={{
                fontFamily: "Brush Script MT",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              <i className="fa-regular fa-bookmark"></i> Save Time <br />
              and
              <br /> Money.
            </div>
            <div
              className="col-sm border-none"
              style={{
                fontFamily: "Brush Script MT",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <i className="fa-regular fa-bookmark"></i> You will never be
              charge!
              <br />
              It is Free.
            </div>
            <div
              className="col-sm border-none"
              style={{
                fontFamily: "Brush Script MT",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <i className="fa-regular fa-bookmark"></i> 150+ million books.{" "}
              <br />
              avaible
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionComponent;
