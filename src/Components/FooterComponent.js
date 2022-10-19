import React from "react";

const FooterComponent = () => {
  const styleFooter = {
    height: "70px",
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: "100%",
    backgroundColor: "#198754",
    color: "white",
    textAlign: "center",
    zIndex: 5,
    marginTop: "-8px",
  };
  return (
    <div id="footer">
      <div style={styleFooter} className="position-sticky-bottom">
        <div
          className="d-flex justify-content-between"
          style={{ width: "20%", marginLeft: "40%" }}
        >
          <a
            className="btn-floating btn-sm btn-li mx-1"
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/doodle/50/000000/facebook-new.png"
              alt="facebook"
              height={"30px"}
            />
          </a>
          <a
            className="btn-floating btn-sm btn-li mx-1"
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/doodle/48/000000/twitter--v1.png"
              alt="twitter"
              height={"30px"}
            />
          </a>
          <a
            className="btn-floating btn-sm btn-li mx-1"
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/doodle/48/000000/instagram-new.png"
              alt="instagram"
              height={"30px"}
            />
          </a>
          <a
            className="btn-floating btn-sm btn-li mx-1"
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/doodle/48/000000/youtube-play--v1.png"
              alt="youtube"
              height={"30px"}
            />
          </a>
        </div>

        <p> &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </div>
  );
};

export default FooterComponent;
