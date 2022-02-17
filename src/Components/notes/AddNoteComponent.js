import React from "react";
import { useNavigate } from "react-router-dom";

const AddNoteComponent = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/notes");
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Id"
                className="form-control my-2"
                name="Id"
              />
              <input
                type="text"
                placeholder="Author Name"
                className="form-control my-2"
                name="Author Name"
              />
              <input
                type="text"
                placeholder="Name of the Book"
                className="form-control my-2"
                name="Name of the Book"
              />
              <input
                type="Date"
                min="2010-01-01"
                max="2030-12-31"
                placeholder="MM-DD-YYYY"
                className="form-control my-2"
                name="Date"
              />
              <input
                type="text"
                placeholder="Username"
                className="form-control my-2"
                name="Username"
              />
              <textarea
                placeholder="Description"
                type="text"
                className="form-control"
                name="Description"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
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

              <button type="button" className="btn btn-primary">
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
