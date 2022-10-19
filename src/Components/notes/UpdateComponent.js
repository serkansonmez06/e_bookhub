import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import alertify from "alertifyjs";
const UpdateComponent = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    id: "",
    author: "",
    nameOfTheBook: "",
    targetDate: moment(new Date()).format("DD/MM/YYYY"),
    username: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const descriptionValidation = () => {
    if (data.description.length < 5) {
      //alertify.error("Description must be at least five(5) characters");
      window.alert("Description must be at least five(5) characters");
    } else {
      // console.log("no err");
    }
  };

  const usernameValidation = () => {
    if (data.username.length < 6) {
      //alertify.error("Description must be at least six(6) characters");
      window.alert("user name must be at least six(6) characters");
    } else {
      // console.log("no err");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(process.env.REACT_APP_BASE_URL_UPDATE, data)
      .then((response) => {
        // console.log(response.data);
        navigate("/notes");
        alertify.success("Updated", 2.5);
      })
      .catch((err) => {
        console.log("error is :" + err);
        descriptionValidation();
        usernameValidation();
        alertify.error("Update failed", 2.5);
      });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/" + id)
      .then((response) => {
        setData(response.data);
        // console.log("hey", response.data.targetDate.substring(0, 10));
      })
      .catch((err) => console.log("err is : " + err));
  }, [id]);

  const handleClose = () => {
    navigate("/notes");
    alertify.success("redirect homepage", 2.5);
  };
  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5debc",
        }}
      >
        <div style={{ marginTop: "-3%" }}>
          <div className="modal-dialog" style={{ padding: "2%" }}>
            <div
              className="modal-content"
              style={{ backgroundColor: "#B3A99A" }}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Notes
                </h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Id"
                  className="form-control my-2"
                  readOnly
                  name="id"
                  value={data.id}
                  onChange={(e) => handleOnChange(e)}
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  className="form-control my-2"
                  name="author"
                  value={data.author}
                  onChange={(e) => handleOnChange(e)}
                />
                <input
                  type="text"
                  placeholder="Name of the Book"
                  className="form-control my-2"
                  name="nameOfTheBook"
                  value={data.nameOfTheBook}
                  onChange={(e) => handleOnChange(e)}
                />
                <input
                  type="date"
                  placeholder="Date"
                  className="form-control my-2"
                  name="targetDate"
                  value={data.targetDate.slice(0, 10)}
                  onChange={(e) => handleOnChange(e)}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control my-2"
                  name="username"
                  value={data.username}
                  onChange={(e) => handleOnChange(e)}
                />
                <textarea
                  placeholder="Description"
                  type="text"
                  className="form-control"
                  name="description"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={data.description}
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateComponent;
