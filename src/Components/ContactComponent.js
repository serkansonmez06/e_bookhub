import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

const ContactComponent = () => {
  const [admin, setAdmin] = useState([]);
  const [testAdmin, setTestAdmin] = useState({ email: "" });
  // const user = useSelector(selectUser);

  const getAdmin = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_ADMIN)
      .then((response) => {
        setAdmin(response.data);
        //setTestAdmin({ email: response.data[0].email });
        setTestAdmin({ email: response.data.at(-1) });
        //response.data[0].email;
      })
      .catch((err) => console.log(err));
  };
  // const deleteAdmin = async (id) => {
  //   alertify
  //     .confirm(
  //       "Are you sure you want to permanently DELETE your admin profile ?",
  //       () => {
  //         if (id) {
  //           axios
  //             .delete(process.env.REACT_APP_BASE_ADMIN_DELETE + id)
  //             .then(() => {
  //               // console.log(response);
  //               const deleteAdmin = admin.filter((i) => i.id !== id);
  //               setAdmin(deleteAdmin);
  //               auth.signOut();
  //             });
  //         }

  //         alertify.success("Delete", 1.5);
  //       },
  //       () => {
  //         alertify.error("Cancel", 1.5);
  //       }
  //     )
  //     .setHeader("<em>E-Shelves</em>");
  // };
  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f3df",
      }}
    >
      <div className="container ">
        <div className="row">
          <div className="col-6 mt-5">
            <img
              src="https://media.istockphoto.com/photos/is-there-anything-else-i-can-help-with-picture-id695858734?b=1&k=20&m=695858734&s=170667a&w=0&h=M1HEi7trcFx9wcYwcTBKK3Uzu1e_bRZ3BUFy-zgylK0="
              alt="info"
              style={{
                objectFit: "fill",
                width: "100%",
                height: "350px",
                boxShadow: "22px 22px 25px grey",
              }}
              className="rounded"
            />
          </div>
          <div className="col-6  mt-5">
            <div className="row ">
              <span style={{ fontWeight: "Bold", fontSize: "40px" }}>
                Contact US
              </span>
            </div>
            <div className="row  mt-4 border border-3 border-success border-end-0 border-bottom-0">
              <div className="col-6">
                <form action="" style={{ color: "dark" }}>
                  <TextField
                    id="standard-basic"
                    label="Full Name"
                    variant="standard"
                    color="success"
                  />
                  <br className="mt-3" />
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    color="success"
                  />
                  <br />
                  <TextField
                    id="standard-multiline-static"
                    label="Message"
                    color="success"
                    multiline
                    rows={4}
                    variant="standard"
                  />
                  <br />
                </form>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <button className="rounded-pill btn btn-secondary">
                    Send Message
                  </button>
                </div>
              </div>
              <div className="col-6  text-justify">
                <div className="mt-3 ml-5">
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Contact <br />
                  </span>
                  <span>{testAdmin.email.email}</span>
                  <div
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "105px",
                    }}
                  >
                    Based in <br /> Boston, MA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
