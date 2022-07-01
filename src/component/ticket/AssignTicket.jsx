import "./all-ticket.css";
import React, {useEffect} from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {Global} from "../../Global";
const compId = localStorage.getItem("compId");

export default function AssignTicket() {
  const [data, setData] = useState([]);

  useEffect(() => {
   axios.get("http://127.0.0.1:8000/get_all_tickets/"+compId).then((res)=> {
      let dta = res.data;
       dta.forEach((ele, index ) => {
           ele.id = index
       })
       setData(dta);
       
   }).catch((err) => {
     alert("Could not fetch ticket data");
     window.location.href = "/";
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
          let ticketId = params.row.ticketId;
          console.log(ticketId)
          
        return (
          <>
            <Link to={"/assign-ticket/" + ticketId}>
              <button className="productListEdit">Assign Ticket</button>
            </Link>
           
          </>
        );
      },
    },
  ];

  

  return (
  <div className="all-ticket-class">
   {
     data.length === 0 ? (<div>Loading... | Please wait</div>) : (
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
