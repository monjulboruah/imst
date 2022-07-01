import "./delete.css";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Global } from "../../Global";

export default function DeleteDepartment(props) {
  const { deptId } = useParams();
  const [userData, setUser] = useState({
    userId: localStorage.getItem("userId"),
    username: "",
    pwd: "",
    deptId: deptId,
  });

  const state = useContext(Global);

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(values);

    axios
      .post("http://127.0.0.1:8000/delete_dept", {
        userId: userData.userId,
        username: userData.username,
        pwd: userData.password,
        deptId: userData.deptId,
      })
      .then(function (response) {
        alert("Department deleted Successful");
        window.location.href = "/all-department";
      })
      .catch((err) => {
        alert("Wrong credential | Problems in server side");
        console.log(err);
        window.location.href = "/all-department";
      });
  };

  return (
    <>
      <div className="newUser">
        <h3 className="newUserTitle">
          Enter <u>username</u> and <u>password</u> to delete
        </h3>
        <div className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input
              type="text"
              placeholder="john"
              onChange={(e) =>
                setUser({ ...userData, username: e.target.value })
              }
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) =>
                setUser({ ...userData, password: e.target.value })
              }
            />
          </div>

          <button className="newUserButton" onClick={(e) => onSubmit(e)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
