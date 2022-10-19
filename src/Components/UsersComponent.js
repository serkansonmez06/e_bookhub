import React, { useEffect, useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const UsersComponent = () => {
  const [admin, setAdmin] = useState({});
  const [adminEmailDB, setAdminEmailDB] = useState({ email: "" });
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ id: "", email: "" });
  // const [item, setItem] = useState({});
  // const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = (id, email) => {
    setAlert({ id, email });
    // console.log(id, email);
  };
  const getAdmin = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_ADMIN)
      .then((response) => {
        setAdmin(response.data);
        // console.log(response.data);
        setAdminEmailDB({ email: response.data.at(-1) });
        // setAdminEmailDB({ email: response.data[0].email });
        // console.log({ email: response.data.at(-1) });
      })
      .catch((err) => console.log(err));
  };
  const makeAdmin = (id) => {
    axios
      .get(process.env.REACT_APP_BASE_USERS + id)
      .then((response) => {
        setAdmin(response.data);
        // console.log(response.data);
        // console.log("hey", id);
      })
      .catch((err) => console.log("err is : " + err));
  };
  // const handleOnChange = (e) => {
  //   e.preventDefault();
  //   setAdmin({ ...admin, [e.target.name]: e.target.value });
  //   console.log("handleoN", admin);
  // };
  const handleSubmitAdmin = () => {
    console.log("savetoDb");

    axios
      .post(process.env.REACT_APP_BASE_USERS_SAVE, admin)
      .then((response) => {
        // console.log(response.data);

        alertify.success("New Admin Updated", 2.5);
        navigate("/");
        auth.signOut() && window.location.reload();
      })
      .catch((err) => {
        console.log("error is :" + err);

        alertify.error("Update failed", 2.5);
      });
  };

  const getUsers = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_USERS)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAdmin();
    getUsers();
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5debc",
      }}
    >
      <div style={{ marginTop: "0%" }}>
        <div style={{ padding: "3%" }}>
          <div
            className="d-flex justify-content-center  "
            style={{
              height: "300px",
              marginTop: "3%",
              width: "40%",
              marginLeft: "10%",
            }}
          >
            <form action="">
              <table className="table">
                <thead className="thead-dark">
                  <label
                    htmlFor=""
                    style={{
                      fontFamily: "cursive",
                      color: "ButtonShadow",
                      marginLeft: "0%",
                      marginTop: "3%",
                    }}
                    data-toggle="tooltip"
                    title="Plese select ONLY one user in order to process"
                  >
                    <i
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "green" }}
                    ></i>{" "}
                    <span style={{ color: "green" }}>
                      Please select ONLY one user!
                    </span>
                  </label>
                  <tr>
                    <th scope="col" className="text-justify">
                      User List
                    </th>
                    <th scope="col">Select admin</th>
                  </tr>
                </thead>
                <tbody>
                  {user
                    .sort((a, b) => a.id - b.id)
                    .map((item, key) => (
                      <tr key={key}>
                        <td className="text-justify">{item.email}</td>
                        <td>
                          <div className="form-check">
                            <input
                              name="adminCheckBox"
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                              onChange={() =>
                                handleCheckBox(item.id, item.email)
                              }
                            />
                          </div>
                          <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Are you sure you want to make this user
                                    admin?
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>

                                <div className="modal-body">
                                  <div
                                    type="text"
                                    onChange={() => handleCheckBox(item.email)}
                                    style={{ fontFamily: "cursive" }}
                                  >
                                    {alert.email}
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    No
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmitAdmin}
                                  >
                                    Yes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn  btn-success"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  window.alert(
                    "You will automatically log out after you select new admin"
                  );
                  makeAdmin(alert.id);
                }}
              >
                Promote New Admin
              </button>
            </form>
          </div>
        </div>

        <div>
          <div
            className="card"
            style={{
              width: "19%",
              marginTop: "-14%",
              marginRight: "15%",
              position: "absolute",
              right: "0%",
              backgroundColor: "#de6926",
            }}
          >
            <img
              className="card-img-top"
              src="https://images.squarespace-cdn.com/content/v1/59cae0d6be42d63f64cf6dd2/1599779759090-8F4Z535L21O472LMNVRA/avatar-1577909_1280.png"
              alt="Cardcap"
              style={{ padding: "30px" }}
            />
            <span style={{ fontWeight: "bold", color: "white" }}> Admin</span>
            <hr /> <br />
            <span
              style={{
                marginTop: "-5%",
                marginBottom: "8%",
                color: "white",
              }}
            >
              <span style={{ color: "white" }}>{adminEmailDB.email.email}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;
