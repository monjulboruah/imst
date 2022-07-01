import "./login.css";
import axios from "axios";
import React, { useState, useContext } from "react";
import { Global } from "../../Global";
import { useHistory } from "react-router-dom";
import Loading from "../../utils/Loading";

export default function Login(props) {
  const [userData, setUser] = useState({
    username: "",
    password: "",
  });

  const state = useContext(Global);

  const [error, setError] = useState({
    err: "",
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(values);
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/auth", {
        username: userData.username,
        pwd: userData.password,
      })
      .then(function (response) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userId", response.data.contact_id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("firstLogin", true);
        localStorage.setItem("compId", response.data.company[0]);

        setLoading(false);
        //alert("Login Successful");
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        alert("Wrong credential | Problems in server side");
        console.log(err);
        window.location.href = "/login";
      });
  };

  return (
    <>
      {loading ? (
        Loading
      ) : (
        <div className="newUser">
          <h1 className="newUserTitle">Log in</h1>
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
              Log in
            </button>
            <p className="messageUser">
              Don't have an account! contact to administrator
            </p>
          </div>
        </div>
      )}
    </>
  );
}
