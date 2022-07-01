import "./all-ticket.css";
import React, {useEffect} from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {Global} from "../../Global";
const userId = localStorage.getItem("userId");

export default function AllTickets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAssignedTicketEmpty, setAssignedTicketEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
   axios.get("http://127.0.0.1:8000/my_assigned_ticket/"+userId).then((res)=> {
      let dta = res.data;
      if(dta.length === 0){
        setAssignedTicketEmpty(true);
      }
       dta.forEach((ele, index ) => {
           ele.id = index
       })
       setData(dta);
       setLoading(false);
   }).catch((err) => {
     alert("Could not fetch your assigned ticket");
   })
  }, []);

  const columns = [
    {field: "id", headerName: "ID", width: 135 },
    { field: "ticketId", headerName: "Ticket ID", width: 135 },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      
    },
    { field: "categoryId", headerName: "Category Id", width: 200 },
    
    {
      field: "creator",
      headerName: "Creator",
      width: 200,
    },

    {
        field: "dateClosed",
        headerName: "Date Closed",
        width: 200,
      },

      {
        field: "dateCreated",
        headerName: "Date Created",
        width: 200,
      },

      
      {
        field: "description",
        headerName: "Description",
        width: 300,
      },

      {
        field: "lastModified",
        headerName: "Last Modified",
        width: 200,
      },


    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit-ticket/" + params.row.ticketId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <Link to={"/close-ticket/" + params.row.ticketId}>
              <button className="productListEdit">Close</button>
            </Link>
            <Link to={"/view-ticket/" + params.row.ticketId}>
              <button className="productListEdit">View</button>
            </Link>

          </>
        );
      },
    },
  ];

 

  return (
  <div className="all-ticket-class">
    {
     loading === true  ? <div>Loading... | Please wait </div> 
     : isAssignedTicketEmpty ? <div>No Tickects are assigned to you</div> :    
     (
      <div id="div1" >
      
         <div id="div3">
      
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={4}
            checkboxSelection
            className="data-grid"
          />
      
        </div>
 
    </div>
      )
    }

    
</div>
  );
}
