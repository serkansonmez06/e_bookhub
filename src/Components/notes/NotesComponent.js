import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import "../../App/App.css";
import { Link } from "react-scroll";
const NotesComponent = () => {
  const [notes, setNotes] = useState([]);
  const user = useSelector(selectUser);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [admin, setAdmin] = useState([]);
  const [adminEmailDB, setAdminEmailDb] = useState({ email: "" });
  // const [lastTest, setLastTest] = useState();
  const navigate = useNavigate();

  const deleteItem = async (id) => {
    alertify
      .confirm(
        "Are you sure you want to permanently remove id# " + id + " ?",
        () => {
          if (id) {
            axios.delete(process.env.REACT_APP_BASE_URL + "/" + id).then(() => {
              // console.log(response);
              const remainingData = notes.filter((i) => i.id !== id);
              setNotes(remainingData);
            });
          }
          alertify.success("Delete", 2.5);
        },
        () => {
          alertify.error("Cancel", 2.5);
        }
      )
      .setHeader("<em>E-Shelves</em>");
  };
  const updateItem = (id) => {
    // console.log("update " + id);
    navigate("/update/" + id);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    let result = [];
    result = notes.filter((data) => data.username.search(keyword) !== -1);
    setNotes(result);
    if (keyword === "") {
      getData();
    }
  };
  const handleAddNavigate = () => {
    navigate("/add");
  };
  // const handleReset = () => {
  //   // inputRef.current.value = "";
  // };
  const getData = async () => {
    axios
      .get(process.env.REACT_APP_BASE_URL)
      .then((response) => {
        setNotes(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(" error is " + err));
  };

  const handleAlertForOtherUser = () => {
    alertify
      .alert("You do not have permission to delete this entry.")
      .setHeader("<em>E-Shelves</em>");
  };

  // const handleMin = (e) => {
  //   const min = e.target.value;
  //   setMinValue({ min });
  // };

  const handleMax = (e) => {
    let max = e.target.value;

    if (max === "") {
      max = 1000;
    }
    setMaxValue(max);
    // console.log(max);
  };

  const getAdmin = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_ADMIN)
      .then((response) => {
        setAdminEmailDb({ email: response.data.at(-1) });
        //setAdminEmailDb({ email: response.data[0].email });
        // console.log(" setTEst ", response.data.at(-1));
        setAdmin(response.data);

        ///
        // console.log(response.data);
        //adminEmailDB(response.data);
        // const result = response.data.map((a) => a.id);
        // const max = Math.max(...result);

        // console.log("max = " + max);
        // console.log(response.data);
        // console.log("admin", admin);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
    getAdmin();
  }, [setNotes, setAdmin]);

  return (
    <div
      style={{
        backgroundColor: "#f5d4a4",
        marginTop: "-30px",
      }}
    >
      <div style={{ minHeight: "100vh" }}>
        <Link to="footer" spy={true} smooth={false}>
          <div style={{ position: "absolute", top: "120px", right: "25px" }}>
            <button type="button" className="btn btn-success m-1">
              <i className="fa-solid fa-arrow-down"></i> Page down
            </button>
          </div>
        </Link>

        <div
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            padding: "30px",
          }}
        >
          <div
            className="input-group"
            style={{
              width: "70%",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "30px",
              marginBottom: "5px",
            }}
            data-toggle="tooltip"
            title="Search notes by username"
          >
            <input
              type="text"
              className="form-control rounded"
              placeholder="&#xF002; Search by Username"
              aria-label="Search"
              aria-describedby="search-addon"
              style={{ fontFamily: "Arial,FontAwesome" }}
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            {/* <button type="button" className="btn btn-success" onClick={handleReset}>
          Reset
        </button> */}
          </div>
          <div>
            <label
              htmlFor=""
              style={{ fontFamily: "cursive", color: "ButtonShadow" }}
            >
              Click buttons or custom entry to display number of notes
            </label>
            <br />
            <div className="d-inline-flex">
              <button
                onClick={() => setMaxValue(1)}
                data-toggle="tooltip"
                title="Display 1 note"
                className="btn btn-secondary m-1"
              >
                1
              </button>
              <button
                onClick={() => setMaxValue(5)}
                data-toggle="tooltip"
                title="Display 5 notes"
                className="btn btn-secondary m-1"
              >
                5
              </button>
              <button
                onClick={() => setMaxValue(10)}
                data-toggle="tooltip"
                title="Display 10 notes"
                className="btn btn-secondary m-1"
              >
                10
              </button>
              <button
                onClick={() => setMaxValue(15)}
                data-toggle="tooltip"
                title="Display 15 notes"
                className="btn btn-secondary m-1"
              >
                15
              </button>
              <div
                style={{ marginTop: "4px", height: "35px", width: "40px" }}
                className="m-1"
              >
                <label>
                  <input
                    name="max"
                    size={1}
                    className="form-control rounded"
                    data-toggle="tooltip"
                    title="Enter custom number"
                    onChange={(e) => {
                      handleMax(e);
                    }}
                  />
                </label>
              </div>
              <button
                onClick={() => setMaxValue(100)}
                data-toggle="tooltip"
                title="Display all notes"
                className="btn btn-secondary m-1"
              >
                Display all notes
              </button>
            </div>

            <label
              style={{ margin: "10px", marginTop: "10px", marginLeft: "auto" }}
            >
              {/* Min: */}
              {/* <input
            type="text"
            name="min"
            size={3}
            className="form-control rounded"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e) => {
              handleMin(e);
            }}
          /> */}
            </label>
          </div>

          <div style={{ marginBottom: "20px", marginTop: "30px" }}>
            <button
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              type="button"
              data-toggle="tooltip"
              title="Create new note"
              className="btn btn-outline-success"
              onClick={handleAddNavigate}
            >
              <i className="fa-solid fa-circle-plus"></i> Create new note
            </button>
          </div>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Author Name</th>
                <th scope="col">Description</th>
                <th scope="col" style={{ fontSize: "14.5px" }}>
                  Name Of The Book
                </th>
                <th scope="col">Date</th>
                <th scope="col">Username</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            <tbody style={{ fontFamily: "cursive" }}>
              {notes.length === 0 ? (
                <tr>
                  <td style={{ border: "none" }}>
                    <code>There is no match!</code>
                  </td>
                </tr>
              ) : (
                notes
                  .sort((a, b) => a.id - b.id)
                  .slice(minValue, maxValue)
                  .map((item, key) => (
                    <tr key={key} className="text-justify-center">
                      <td className="text-justify">{item.id}</td>
                      <td className="text-justify">{item.author}</td>
                      <td>{item.description}</td>
                      <td className="text-justify">{item.nameOfTheBook}</td>
                      <td>
                        {moment.utc(item.targetDate).format("MM/DD/YYYY")}
                      </td>
                      <td>{item.username}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          type="button"
                          data-toggle="tooltip"
                          title="Update note"
                          onClick={() => {
                            updateItem(item.id);
                          }}
                        >
                          UPDATE
                        </button>
                      </td>
                      <td>
                        {user.email === adminEmailDB.email.email ? (
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-toggle="tooltip"
                            title="Delete note"
                            onClick={() => {
                              deleteItem(item.id);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-toggle="tooltip"
                            title="Delete note"
                            onClick={handleAlertForOtherUser}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ marginRight: "25px", marginBottom: "8px" }}
        >
          <Link to="navbar" spy={true} smooth={false}>
            <button type="button" className="btn btn-success m-1">
              <i className="fa-solid fa-arrow-up"></i> Page up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotesComponent;
