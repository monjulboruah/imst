import react, { useState, useContext } from "react";
import "./create-status.css";
import axios from "axios";
import { Global } from "../../Global";

export default function CreateStatus() {
  const state = useContext(Global);
  const [statusData, setStatusData] = useState({
    status_desc: "",
    closed: true,
  });

  const onChangeStatus = (e) => {
    setStatusData({
      ...statusData,
      status_desc: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let { status_desc, closed } = statusData;
    axios
      .post("http://127.0.0.1:8000/add_status", {
        status_desc,
        closed,
      })
      .then(function (response) {
        alert("status created successfully");
        //console.log(response);
        window.location.href = "/all-status";
      })
      .catch((err) => {
        alert("Problems in server side");
        //console.log(err);
        //window.location.href = "/create-company";
      });
  };

  return (
    <div className="newUser">
      <>
        <h3 className="newUserTitle">Create New Status</h3>
        <div className="newUserForm">
          <div className="newUserItem">
            <label>Status Name</label>
            <input
              type="text"
              placeholder="Eg: Pending"
              onChange={onChangeStatus}
              required
            />
          </div>

          <button className="newUserButton" onClick={onSubmit}>
            Create
          </button>
        </div>
      </>
    </div>
  );
}
