import React, { useState, useEffect, useContext } from "react";
import "./all-status.css";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Global } from "../../Global";

export default function AllStatus(props) {
  const state = useContext(Global);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isStatusEmpty, setStatusEmpty] = useState(false);
  const [ticketStatus, setTicketStatus] = state.TicketApi.ticketStatus;

  useEffect(async () => {
    setLoading(true);
    if (ticketStatus.length === 0) {
      await axios
        .get("http://127.0.0.1:8000/get_all_status", {
          crossdomain: true,
        })
        .then((res) => {
          let dta = res.data;

          if (dta.length === 0) {
            setStatusEmpty(true);
          } else {
            dta.forEach((ele, index) => {
              ele.id = index;
            });
            setData(dta);
            setTicketStatus(dta);
          }

          setLoading(false);
        })
        .catch((err) => {
          alert("Could not fetch status data");
          window.location.href = "/";
          console.log(err);
        });
    } else {
      setData(ticketStatus);
      setLoading(false);
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "statusId",
      headerName: "Status ID",
      width: 200,
    },
    { field: "statusDesc", headerName: "Status Description", width: 200 },
  ];

  return (
    <div className="productList">
      {loading === true ? (
        <div>Loading... | Please wait</div>
      ) : isStatusEmpty ? (
        <div>No Status found</div>
      ) : (
        <div id="div1">
          <div id="div3">
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </div>
        </div>
      )}
    </div>
  );
}
