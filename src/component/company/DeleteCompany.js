import "./delete.css";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Global } from "../../Global";

export default function DeleteCompany(props) {
  const { compId } = useParams();
  const [userData, setUser] = useState({
    user_id: localStorage.getItem("userId"),
    username: "",
    pwd: "",
    comp_id: compId,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/delete_company", {
        user_id: userData.user_id,
        username: userData.username,
        pwd: userData.pwd,
        deptId: userData.deptId,
      })
      .then(function (response) {
        alert("Company deleted Successful");
        window.location.href = "/all-company";
      })
      .catch((err) => {
        alert("Wrong credential | Problems in server side");
        console.log(err);
        window.location.href = "/all-company";
      });
  };

  return (
    <>
      <div className="newUser">
        <h3 className="newUserTitle">
          Enter <u>username</u> and <u>password</u> to delete company
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
              onChange={(e) => setUser({ ...userData, pwd: e.target.value })}
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
