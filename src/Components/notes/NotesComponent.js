import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const NotesComponent = () => {
  const [notes, setNotes] = useState([]);
  const user = useSelector(selectUser);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  const navigate = useNavigate();

  const deleteItem = async (id) => {
    alertify
      .confirm(
        "Are you sure you want to permanently remove id# " + id + " ?",
        () => {
          if (id) {
            axios.delete(process.env.REACT_APP_BASE_URL + id).then(() => {
              // console.log(response);
              const remainingData = notes.filter((i) => i.id !== id);
              setNotes(remainingData);
            });
          }
          alertify.success("Delete", 1.5);
        },
        () => {
          alertify.error("Cancel", 1.5);
        }
      )
      .setHeader("<em>E-Shelves</em>");
  };
  const updateItem = (id) => {
    console.log("update " + id);
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
    await axios
      .get(process.env.REACT_APP_BASE_URL)
      .then((response) => {
        setNotes(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(" error is " + err));
  };

  const handleAlertForOtherUser = () => {
    alertify
      .alert("You do not have permission to delete this entry")
      .setHeader("<em>E-Shelves</em>");
  };

  const handleMin = (e) => {
    const min = e.target.value;

    setMinValue({ min });
  };

  const handleMax = (e) => {
    const max = e.target.value;
    setMaxValue(max);

    console.log(max);
  };

  useEffect(() => {
    getData();
  }, [setNotes]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ marginLeft: "30px", marginRight: "30px" }}>
        <div
          className="input-group"
          style={{
            width: "70%",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "30px",
            marginBottom: "5px",
          }}
        >
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search by User Name"
            aria-label="Search"
            aria-describedby="search-addon"
            // ref={inputRef}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          {/* <button type="button" className="btn btn-success" onClick={handleReset}>
          Reset
        </button> */}
        </div>

        <label
          style={{ margin: "10px", marginTop: "10px", marginLeft: "auto" }}
        >
          Min:
          <input
            type="text"
            name="min"
            size={3}
            className="form-control rounded"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e) => {
              handleMin(e);
            }}
          />
        </label>
        <label>
          Max:
          <input
            type="text"
            name="max"
            size={3}
            className="form-control rounded"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e) => {
              handleMax(e);
            }}
          />
        </label>

        <div style={{ marginBottom: "20px", marginTop: "10px" }}>
          <button
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            type="button"
            className="btn btn-outline-success"
            onClick={handleAddNavigate}
          >
            Create new note
          </button>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Author Name</th>
              <th scope="col">Description</th>
              <th scope="col">Name Of The Book</th>
              <th scope="col">Date</th>
              <th scope="col">Username</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
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
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.author}</td>
                    <td>{item.description}</td>
                    <td>{item.nameOfTheBook}</td>
                    <td>{moment(item.targetDate).format("MM-DD-YYYY")}</td>
                    <td>{item.username}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        type="button"
                        onClick={() => {
                          updateItem(item.id);
                        }}
                      >
                        UPDATE
                      </button>
                    </td>
                    <td>
                      {user.email === process.env.REACT_APP_ADMIN_EMAIL ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            deleteItem(item.id);
                          }}
                        >
                          DELETE
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleAlertForOtherUser}
                        >
                          DELETE
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesComponent;
