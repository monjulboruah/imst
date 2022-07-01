import "./close-ticket.css";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Global } from "../../Global";

export default function CloseTicket(props) {
  const { ticketId } = useParams();
  const [closeData, setCloseData] = useState({
    t_id: ticketId,
    closed_by: localStorage.getItem("userId"),
    solution_text: "",
    comp_id:  localStorage.getItem("compId"),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    let { t_id, closed_by, solution_text, comp_id } = closeData;
    axios
      .post("http://127.0.0.1:8000/close_ticket", {
        t_id,
        closed_by,
        solution_text,
        comp_id
      })
      .then(function (response) {
        alert("Ticket closed Successfully");
        window.location.href = "/solutions";
      })
      .catch((err) => {
        alert("Problems in server side");
        console.log(err);
      });
  };

  return (
    <>
      <div className="newUser">
        <h3 className="newUserTitle">
          Please fill the details to close the ticket
        </h3>

        <div className="newUserForm">
          <div className="newUserItem">
            <label>Solution:</label>
            <input
              type="text"
              placeholder="How you solved the ticket"
              onChange={(e) =>
                setCloseData({ ...closeData, solution_text: e.target.value })
              }
            />
          </div>

          <button className="newUserButton" onClick={(e) => onSubmit(e)}>
            Close Ticket
          </button>
        </div>
      </div>
    </>
  );
}
