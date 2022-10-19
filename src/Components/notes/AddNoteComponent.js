import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

const AddNoteComponent = () => {
  const [data, setData] = useState({
    id: "",
    author: "",
    description: "",
    nameOfTheBook: "",
    targetDate: moment(new Date()).format("DD/MM/YYYY"),
    username: "",
  });

  const datePick = () => {
    if (data.targetDate === moment(new Date()).format("DD/MM/YYYY")) {
      //alertify.error("Description must be at least five(5) characters");
      window.alert("please select date");
    } else {
      // console.log("no err");
    }
  };

  const usernameValidation = () => {
    if (data.username.length < 7) {
      //alertify.error("Description must be at least four(4) characters");
      window.alert("user name must be at least seven(7) characters");
    } else {
      // console.log("no err");
    }
  };
  const descriptionValidation = () => {
    if (data.description.length < 6) {
      //alertify.error("Description must be at least five(5) characters");
      window.alert("Description must be at least six(6) characters");
    } else {
      // console.log("no err");
    }
  };
  const saveNoteToDB = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.REACT_APP_BASE_URL_SAVE, data)
      .then((response) => {
        setData(response.data);
        // console.log("hey", response.data);
        alertify.success("New note successfully added", 2.5);
        navigate("/notes");
      })
      .catch((err) => {
        console.log(err);
        datePick();
        usernameValidation();
        descriptionValidation();

        alertify.error("Fail to add new note, check your entry please ", 2.5);
      });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data.targetDate);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/notes");
    alertify.success("redirect homepage", 2.5);
  };
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5debc" }}>
      <div style={{ marginTop: "-3%" }}>
        <div className="modal-dialog" style={{ padding: "2%" }}>
          <div className="modal-content" style={{ backgroundColor: "#B3A99A" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new Notes
              </h5>
              <button
                type="button"
                // className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Author Name"
                className="form-control my-2"
                name="author"
                onChange={handleOnChange}
              />
              <input
                type="text"
                placeholder="Name of the Book"
                className="form-control my-2"
                name="nameOfTheBook"
                onChange={handleOnChange}
              />
              <input
                type="Date"
                min={moment().toDate().toUTCString()}
                max={moment().toDate().toUTCString()}
                placeholder="YYYY-MM-DD"
                className="form-control my-2"
                name="targetDate"
                onChange={handleOnChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="form-control my-2"
                name="username"
                onChange={handleOnChange}
              />
              <textarea
                placeholder="Description"
                type="text"
                className="form-control"
                name="description"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleOnChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancel}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-success"
                onClick={saveNoteToDB}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteComponent;
