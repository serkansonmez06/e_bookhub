import React from "react";

const FooterComponent = () => {
  const styleFooter = {
    height: "30px",
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: "100%",
    backgroundColor: "#198754",
    color: "white",
    textAlign: "center",
    zIndex: 5,
  };
  return (
    <div>
      <div style={styleFooter} className="position-sticky-bottom">
        <p> E-Shelves &copy; | {new Date().getFullYear()}</p>
        {/* <p> by Serkan Sonmez</p> */}
      </div>
    </div>
  );
};

export default FooterComponent;
